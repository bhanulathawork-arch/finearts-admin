import React, {
  useEffect,
  useState,
} from "react";

import {
  getAboutPage,
  updateAboutPage,
} from "../services/about.service";


/* =========================================================
   DEFAULT ITEMS
========================================================= */

const emptyFeature = () => ({
  title: "",
  description: "",
  icon: "star",
  is_active: 1,
});


const emptyGrowthStep = () => ({
  title: "",
  description: "",
  icon: "check",
});


/* =========================================================
   DEFAULT DATA
========================================================= */

const defaultData = {
  story_enabled: 1,

  story_small_title: "",

  story_title: "",

  story_description: "",

  story_image_url: "",

  story_image_file: null,

  story_image_preview: "",


  why_choose_enabled: 1,

  why_choose_title:
    "Why Choose Our Institute?",

  why_choose_description: "",


  grow_enabled: 1,

  grow_title:
    "How We Help You Grow",

  grow_description: "",


  features: [
    emptyFeature(),
    emptyFeature(),
    emptyFeature(),
  ],


  growthSteps: [
    emptyGrowthStep(),
    emptyGrowthStep(),
    emptyGrowthStep(),
    emptyGrowthStep(),
  ],
};


/* =========================================================
   COMPONENT
========================================================= */

const InstituteAbout = () => {

  const [form, setForm] =
    useState(defaultData);


  const [loading, setLoading] =
    useState(true);


  const [saving, setSaving] =
    useState(false);


  const [message, setMessage] =
    useState("");


  const [error, setError] =
    useState("");


  /* =======================================================
     LOAD ABOUT PAGE
  ======================================================= */

  useEffect(() => {
    loadAbout();
  }, []);


  const loadAbout = async () => {

    try {

      setLoading(true);
      setError("");

      const data =
        await getAboutPage();


      console.log(
        "=========================================="
      );

      console.log(
        "ABOUT PAGE RESPONSE"
      );

      console.log(data);

      console.log(
        "=========================================="
      );


      if (!data) {

        setForm(defaultData);

        return;
      }


      /* ===================================================
         MAP BACKEND DATA → FRONTEND FORM
      =================================================== */

      const mappedData = {

        ...defaultData,


        /* -----------------------------------------------
           STORY
        ----------------------------------------------- */

        story_enabled:
          data.story_enabled ??
          1,

        story_small_title:
          data.story_small_heading ??
          data.story_small_title ??
          "",

        story_title:
          data.story_main_heading ??
          data.story_title ??
          "",

        story_description:
          data.story_description ??
          "",

        story_image_url:
          data.story_image_url ??
          "",

        story_image_file:
          null,

        story_image_preview:
          "",


        /* -----------------------------------------------
           WHY CHOOSE
        ----------------------------------------------- */

        why_choose_enabled:
          data.why_choose_enabled ??
          1,

        why_choose_title:
          data.why_title ??
          data.why_choose_title ??
          "Why Choose Our Institute?",

        why_choose_description:
          data.why_description ??
          data.why_choose_description ??
          "",


        /* -----------------------------------------------
           GROW
        ----------------------------------------------- */

        grow_enabled:
          data.growth_enabled ??
          data.grow_enabled ??
          1,

        grow_title:
          data.growth_title ??
          data.grow_title ??
          "How We Help You Grow",

        grow_description:
          data.growth_description ??
          data.grow_description ??
          "",


        /* -----------------------------------------------
           FEATURES
        ----------------------------------------------- */

        features:
          Array.isArray(data.features) &&
          data.features.length > 0

            ? data.features.map(
                (feature) => ({
                  title:
                    feature.title ??
                    "",

                  description:
                    feature.description ??
                    "",

                  icon:
                    feature.icon ??
                    "star",

                  is_active:
                    feature.is_active ??
                    feature.is_enabled ??
                    1,
                })
              )

            : [
                emptyFeature(),
                emptyFeature(),
                emptyFeature(),
              ],


        /* -----------------------------------------------
           GROWTH STEPS
        ----------------------------------------------- */

        growthSteps:
          Array.isArray(
            data.growth_steps
          ) &&
          data.growth_steps.length > 0

            ? data.growth_steps.map(
                (step) => ({
                  title:
                    step.title ??
                    "",

                  description:
                    step.description ??
                    "",

                  icon:
                    step.icon ??
                    "check",
                })
              )

            : [
                emptyGrowthStep(),
                emptyGrowthStep(),
                emptyGrowthStep(),
                emptyGrowthStep(),
              ],
      };


      console.log(
        "MAPPED ABOUT FORM DATA:",
        mappedData
      );


      setForm(mappedData);

    } catch (err) {

      console.error(
        "LOAD ABOUT PAGE ERROR:",
        err
      );


      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to load About page."
      );

    } finally {

      setLoading(false);

    }
  };


  /* =======================================================
     COMMON INPUT
  ======================================================= */

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  /* =======================================================
     FEATURE
  ======================================================= */

  const updateFeature = (
    index,
    field,
    value
  ) => {

    setForm((previous) => {

      const features =
        [...previous.features];


      features[index] = {
        ...features[index],
        [field]: value,
      };


      return {
        ...previous,
        features,
      };

    });
  };


  const addFeature = () => {

    setForm((previous) => ({
      ...previous,

      features: [
        ...previous.features,
        emptyFeature(),
      ],
    }));
  };


  const removeFeature = (
    index
  ) => {

    setForm((previous) => ({
      ...previous,

      features:
        previous.features.filter(
          (_, i) => i !== index
        ),
    }));
  };


  /* =======================================================
     GROWTH STEP
  ======================================================= */

  const updateGrowthStep = (
    index,
    field,
    value
  ) => {

    setForm((previous) => {

      const growthSteps =
        [...previous.growthSteps];


      growthSteps[index] = {
        ...growthSteps[index],
        [field]: value,
      };


      return {
        ...previous,
        growthSteps,
      };

    });
  };


  const addGrowthStep = () => {

    setForm((previous) => ({
      ...previous,

      growthSteps: [
        ...previous.growthSteps,
        emptyGrowthStep(),
      ],
    }));
  };


  const removeGrowthStep = (
    index
  ) => {

    setForm((previous) => ({
      ...previous,

      growthSteps:
        previous.growthSteps.filter(
          (_, i) => i !== index
        ),
    }));
  };


  /* =======================================================
     IMAGE CHANGE
  ======================================================= */

  const handleStoryImageChange = (
    e
  ) => {

    const file =
      e.target.files?.[0];


    if (!file) {
      return;
    }


    /* -----------------------------------------------------
       Validate image
    ----------------------------------------------------- */

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];


    if (
      !allowedTypes.includes(
        file.type
      )
    ) {

      setError(
        "Only JPG, PNG and WEBP images are allowed."
      );

      return;
    }


    /* -----------------------------------------------------
       Size validation
    ----------------------------------------------------- */

    const maxSize =
      100 * 1024 * 1024;


    if (
      file.size > maxSize
    ) {

      setError(
        "Image size must be less than 100 MB."
      );

      return;
    }


    const previewUrl =
      URL.createObjectURL(
        file
      );


    setForm((previous) => ({
      ...previous,

      story_image_file:
        file,

      story_image_preview:
        previewUrl,
    }));


    setError("");
  };


  /* =======================================================
     SAVE
  ======================================================= */

  const handleSave = async () => {

    try {

      setSaving(true);

      setMessage("");

      setError("");


      console.log(
        "=========================================="
      );

      console.log(
        "SAVING ABOUT PAGE"
      );

      console.log(
        "FRONTEND FORM:",
        form
      );


      /* ===================================================
         MAP FRONTEND → BACKEND
      =================================================== */

      const aboutData = {

        /* -----------------------------------------------
           STORY
        ----------------------------------------------- */

        story_small_heading:
          form.story_small_title,

        story_main_heading:
          form.story_title,

        story_description:
          form.story_description,

        story_image_url:
          form.story_image_url,


        /* -----------------------------------------------
           WHY CHOOSE
        ----------------------------------------------- */

        why_title:
          form.why_choose_title,

        why_description:
          form.why_choose_description,


        /* -----------------------------------------------
           GROWTH
        ----------------------------------------------- */

        growth_title:
          form.grow_title,

        growth_description:
          form.grow_description,


        /* -----------------------------------------------
           FEATURES
        ----------------------------------------------- */

        features:
          form.features.map(
            (feature, index) => ({
              title:
                feature.title,

              description:
                feature.description,

              display_order:
                index + 1,

              is_active:
                feature.is_active ??
                1,
            })
          ),


        /* -----------------------------------------------
           GROWTH STEPS
        ----------------------------------------------- */

        growth_steps:
          form.growthSteps.map(
            (step, index) => ({
              title:
                step.title,

              description:
                step.description,

              step_number:
                index + 1,
            })
          ),
      };


      console.log(
        "BACKEND ABOUT DATA:",
        aboutData
      );


      /* ===================================================
         FORM DATA
      =================================================== */

      const formData =
        new FormData();


      formData.append(
        "aboutData",
        JSON.stringify(
          aboutData
        )
      );


      /* ===================================================
         STORY IMAGE
      =================================================== */

      if (
        form.story_image_file
      ) {

        console.log(
          "UPLOADING STORY IMAGE:",
          {
            name:
              form.story_image_file
                .name,

            type:
              form.story_image_file
                .type,

            size:
              form.story_image_file
                .size,
          }
        );


        formData.append(
          "story_image",
          form.story_image_file
        );
      }


      console.log(
        "CALLING UPDATE ABOUT API..."
      );


      const response =
        await updateAboutPage(
          formData
        );


      console.log(
        "UPDATE ABOUT RESPONSE:",
        response
      );


      setMessage(
        "About page saved successfully."
      );


      /* ===================================================
         RELOAD DATA
      =================================================== */

      await loadAbout();


      console.log(
        "ABOUT PAGE RELOADED"
      );


      console.log(
        "=========================================="
      );

    } catch (err) {

      console.error(
        "SAVE ABOUT PAGE ERROR:",
        err
      );


      console.error(
        "RESPONSE:",
        err.response?.data
      );


      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to save About page."
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
      <>
        <style>
          {styles}
        </style>

        <div className="about-loading">

          <div className="about-spinner" />

          <p>
            Loading About Page...
          </p>

        </div>
      </>
    );
  }


  /* =======================================================
     UI
  ======================================================= */

  return (
    <>
      <style>
        {styles}
      </style>


      <div className="institute-about-page">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="about-header">

          <div>

            <div className="page-badge">
              WEBSITE CONTENT
            </div>


            <h1>
              About Page
            </h1>


            <p>
              Manage the content displayed
              on your public About page.
            </p>

          </div>


          <button
            type="button"
            className="save-button"
            onClick={handleSave}
            disabled={saving}
          >

            {saving ? (

              <>

                <span
                  className="button-spinner"
                />

                Saving...

              </>

            ) : (

              <>
                <span>
                  💾
                </span>

                Save Changes
              </>

            )}

          </button>

        </div>


        {/* =================================================
            SUCCESS / ERROR
        ================================================= */}

        {message && (

          <div className="success-message">

            <span>
              ✓
            </span>

            {message}

          </div>

        )}


        {error && (

          <div className="error-message">

            <span>
              !
            </span>

            {error}

          </div>

        )}


        {/* =================================================
            1. OUR STORY
        ================================================= */}

        <section className="about-editor-section">

          <div className="section-heading">

            <div className="section-number">
              01
            </div>


            <div>

              <h2>
                Our Story
              </h2>

              <p>
                Tell visitors about your
                institute and its journey.
              </p>

            </div>

          </div>


          <div className="form-grid">


            <div className="form-group">

              <label>
                Small Heading
              </label>

              <input
                name="story_small_title"
                value={
                  form.story_small_title
                }
                onChange={
                  handleChange
                }
                placeholder="WHO WE ARE"
              />

            </div>


            <div className="form-group">

              <label>
                Main Heading
              </label>

              <input
                name="story_title"
                value={
                  form.story_title
                }
                onChange={
                  handleChange
                }
                placeholder="Our Story"
              />

            </div>


            <div className="form-group full-width">

              <label>
                Description
              </label>

              <textarea
                name="story_description"
                value={
                  form.story_description
                }
                onChange={
                  handleChange
                }
                rows={7}
                placeholder="Tell visitors about your institute..."
              />

            </div>


            <div className="form-group full-width">

              <label>
                Story Image
              </label>


              <input
                type="file"
                name="story_image"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={
                  handleStoryImageChange
                }
              />


              {form.story_image_preview ? (

                <div className="image-preview-wrapper">

                  <img
                    src={
                      form.story_image_preview
                    }
                    alt="Story preview"
                    className="story-image-preview"
                  />

                </div>

              ) : form.story_image_url ? (

                <div className="image-preview-wrapper">

                  <img
                    src={
                      form.story_image_url
                    }
                    alt="Current story"
                    className="story-image-preview"
                  />

                </div>

              ) : null}


              <p className="upload-help">
                Upload an image and save
                the About page.
              </p>

            </div>

          </div>

        </section>


        {/* =================================================
            2. WHY CHOOSE
        ================================================= */}

        <section className="about-editor-section">

          <div className="section-heading">

            <div className="section-number">
              02
            </div>


            <div>

              <h2>
                Why Choose Our Institute?
              </h2>

              <p>
                Add the key reasons students
                should choose your institute.
              </p>

            </div>

          </div>


          <div className="form-grid">


            <div className="form-group full-width">

              <label>
                Section Title
              </label>

              <input
                name="why_choose_title"
                value={
                  form.why_choose_title
                }
                onChange={
                  handleChange
                }
              />

            </div>


            <div className="form-group full-width">

              <label>
                Description
              </label>

              <textarea
                name="why_choose_description"
                value={
                  form.why_choose_description
                }
                onChange={
                  handleChange
                }
                rows={4}
                placeholder="Explain why students should choose your institute..."
              />

            </div>

          </div>


          <div className="repeatable-header">

            <div>

              <h3>
                Features
              </h3>

              <p>
                Add the benefits and strengths
                of your institute.
              </p>

            </div>


            <button
              type="button"
              className="secondary-button"
              onClick={
                addFeature
              }
            >
              + Add Feature
            </button>

          </div>


          <div className="repeatable-list">

            {form.features.map(
              (
                feature,
                index
              ) => (

                <div
                  className="repeatable-card"
                  key={index}
                >

                  <div className="card-top">

                    <span className="item-number">
                      Feature {index + 1}
                    </span>


                    <button
                      type="button"
                      className="remove-button"
                      onClick={() =>
                        removeFeature(
                          index
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>


                  <div className="form-grid">


                    <div className="form-group">

                      <label>
                        Feature Title
                      </label>

                      <input
                        value={
                          feature.title
                        }
                        onChange={(e) =>
                          updateFeature(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="Expert Trainers"
                      />

                    </div>


                    <div className="form-group">

                      <label>
                        Icon
                      </label>

                      <input
                        value={
                          feature.icon
                        }
                        onChange={(e) =>
                          updateFeature(
                            index,
                            "icon",
                            e.target.value
                          )
                        }
                        placeholder="star"
                      />

                    </div>


                    <div className="form-group full-width">

                      <label>
                        Description
                      </label>

                      <textarea
                        value={
                          feature.description
                        }
                        onChange={(e) =>
                          updateFeature(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows={3}
                        placeholder="Learn from experienced professionals."
                      />

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </section>


        {/* =================================================
            3. HOW WE HELP YOU GROW
        ================================================= */}

        <section className="about-editor-section">

          <div className="section-heading">

            <div className="section-number">
              03
            </div>


            <div>

              <h2>
                How We Help You Grow
              </h2>

              <p>
                Explain the learning journey
                students can expect.
              </p>

            </div>

          </div>


          <div className="form-grid">


            <div className="form-group full-width">

              <label>
                Section Title
              </label>

              <input
                name="grow_title"
                value={
                  form.grow_title
                }
                onChange={
                  handleChange
                }
              />

            </div>


            <div className="form-group full-width">

              <label>
                Description
              </label>

              <textarea
                name="grow_description"
                value={
                  form.grow_description
                }
                onChange={
                  handleChange
                }
                rows={4}
                placeholder="Explain how your institute helps students grow..."
              />

            </div>

          </div>


          <div className="repeatable-header">

            <div>

              <h3>
                Growth Steps
              </h3>

              <p>
                Add the steps students follow
                during their learning journey.
              </p>

            </div>


            <button
              type="button"
              className="secondary-button"
              onClick={
                addGrowthStep
              }
            >
              + Add Step
            </button>

          </div>


          <div className="repeatable-list">

            {form.growthSteps.map(
              (
                step,
                index
              ) => (

                <div
                  className="repeatable-card"
                  key={index}
                >

                  <div className="card-top">

                    <span className="item-number">
                      Step {index + 1}
                    </span>


                    <button
                      type="button"
                      className="remove-button"
                      onClick={() =>
                        removeGrowthStep(
                          index
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>


                  <div className="form-grid">


                    <div className="form-group">

                      <label>
                        Step Title
                      </label>

                      <input
                        value={
                          step.title
                        }
                        onChange={(e) =>
                          updateGrowthStep(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="Learn"
                      />

                    </div>


                    <div className="form-group">

                      <label>
                        Icon
                      </label>

                      <input
                        value={
                          step.icon
                        }
                        onChange={(e) =>
                          updateGrowthStep(
                            index,
                            "icon",
                            e.target.value
                          )
                        }
                        placeholder="check"
                      />

                    </div>


                    <div className="form-group full-width">

                      <label>
                        Description
                      </label>

                      <textarea
                        value={
                          step.description
                        }
                        onChange={(e) =>
                          updateGrowthStep(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows={3}
                        placeholder="Build a strong foundation."
                      />

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </section>


        {/* =================================================
            BOTTOM SAVE
        ================================================= */}

        <div className="about-save-bottom">

          <div>

            <strong>
              Ready to publish your changes?
            </strong>

            <span>
              Save your About page content
              after making changes.
            </span>

          </div>


          <button
            type="button"
            className="save-button"
            onClick={handleSave}
            disabled={saving}
          >

            {saving
              ? "Saving..."
              : "Save About Page"}

          </button>

        </div>


      </div>
    </>
  );
};


/* =========================================================
   STYLES
========================================================= */

const styles = `

  .institute-about-page {
    min-height: 100vh;
    padding: 40px;
    background: #0b0b0f;
    color: #ffffff;
    box-sizing: border-box;
  }


  .about-header {
    max-width: 1200px;
    margin: 0 auto 28px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 30px;
  }


  .page-badge {
    display: inline-flex;
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(
      168,
      72,
      255,
      0.12
    );
    border: 1px solid rgba(
      198,
      82,
      255,
      0.25
    );
    color: #c45cff;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    margin-bottom: 12px;
  }


  .about-header h1 {
    margin: 0;
    font-size: 36px;
    line-height: 1.15;
    font-weight: 800;
    background: linear-gradient(
      90deg,
      #b64cff,
      #ec3c9f
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }


  .about-header p {
    margin: 10px 0 0;
    color: #9ca3af;
    font-size: 15px;
  }


  .save-button {
    border: none;
    border-radius: 12px;
    padding: 14px 22px;
    background: linear-gradient(
      135deg,
      #a934ff,
      #ed2e9c
    );
    color: white;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    min-width: 170px;
    transition: 0.2s ease;
  }


  .save-button:hover {
    transform: translateY(-1px);
    box-shadow:
      0 10px 30px rgba(
        190,
        52,
        255,
        0.22
      );
  }


  .save-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }


  .success-message,
  .error-message {
    max-width: 1200px;
    margin: 0 auto 22px;
    padding: 14px 18px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
  }


  .success-message {
    background: rgba(
      34,
      197,
      94,
      0.10
    );
    border: 1px solid rgba(
      34,
      197,
      94,
      0.25
    );
    color: #86efac;
  }


  .error-message {
    background: rgba(
      239,
      68,
      68,
      0.10
    );
    border: 1px solid rgba(
      239,
      68,
      68,
      0.25
    );
    color: #fca5a5;
  }


  .about-editor-section {
    max-width: 1200px;
    margin: 0 auto 24px;
    padding: 28px;
    background: #15151b;
    border: 1px solid #272732;
    border-radius: 18px;
    box-shadow:
      0 12px 35px rgba(
        0,
        0,
        0,
        0.18
      );
  }


  .section-heading {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 28px;
    padding-bottom: 20px;
    border-bottom: 1px solid #292933;
  }


  .section-number {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(
      176,
      65,
      255,
      0.14
    );
    border: 1px solid rgba(
      189,
      72,
      255,
      0.25
    );
    color: #c15cff;
    font-size: 13px;
    font-weight: 800;
  }


  .section-heading h2 {
    margin: 0 0 6px;
    color: #ffffff;
    font-size: 22px;
    font-weight: 750;
  }


  .section-heading p {
    margin: 0;
    color: #8f93a3;
    font-size: 14px;
  }


  .form-grid {
    display: grid;
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
    gap: 20px;
  }


  .form-group {
    min-width: 0;
  }


  .full-width {
    grid-column: 1 / -1;
  }


  .form-group label {
    display: block;
    margin-bottom: 8px;
    color: #e5e7eb;
    font-size: 14px;
    font-weight: 650;
  }


  .form-group input,
  .form-group textarea {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #30303b;
    border-radius: 11px;
    background: #101016;
    color: #ffffff;
    padding: 13px 14px;
    outline: none;
    font-size: 14px;
    font-family: inherit;
    transition: 0.2s ease;
  }


  .form-group input {
    height: 48px;
  }


  .form-group textarea {
    resize: vertical;
    min-height: 100px;
    line-height: 1.55;
  }


  .form-group input[type="file"] {
    height: auto;
    padding: 10px 12px;
    cursor: pointer;
  }


  .image-preview-wrapper {
    margin-top: 14px;
    width: 100%;
    max-width: 420px;
    overflow: hidden;
    border: 1px solid #30303b;
    border-radius: 12px;
    background: #101016;
  }


  .story-image-preview {
    display: block;
    width: 100%;
    max-height: 240px;
    object-fit: cover;
  }


  .upload-help {
    margin: 8px 0 0;
    color: #777b8a;
    font-size: 12px;
  }


  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: #666a78;
  }


  .form-group input:focus,
  .form-group textarea:focus {
    border-color: #bd48ff;
    box-shadow:
      0 0 0 3px rgba(
        189,
        72,
        255,
        0.10
      );
  }


  .repeatable-header {
    margin-top: 30px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }


  .repeatable-header h3 {
    margin: 0 0 5px;
    font-size: 17px;
    color: #ffffff;
  }


  .repeatable-header p {
    margin: 0;
    color: #777b8a;
    font-size: 13px;
  }


  .secondary-button {
    border: 1px solid #7f38aa;
    background: rgba(
      173,
      55,
      255,
      0.10
    );
    color: #cf75ff;
    border-radius: 10px;
    padding: 10px 15px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
  }


  .secondary-button:hover {
    background: rgba(
      173,
      55,
      255,
      0.18
    );
  }


  .repeatable-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }


  .repeatable-card {
    padding: 20px;
    background: #101016;
    border: 1px solid #2b2b36;
    border-radius: 14px;
  }


  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }


  .item-number {
    color: #c764ff;
    font-size: 13px;
    font-weight: 750;
  }


  .remove-button {
    border: 1px solid rgba(
      239,
      68,
      68,
      0.35
    );
    background: rgba(
      239,
      68,
      68,
      0.08
    );
    color: #f87171;
    border-radius: 8px;
    padding: 7px 11px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }


  .remove-button:hover {
    background: rgba(
      239,
      68,
      68,
      0.15
    );
  }


  .about-save-bottom {
    max-width: 1200px;
    margin: 30px auto 0;
    padding: 20px 24px;
    background: #15151b;
    border: 1px solid #2c2c36;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }


  .about-save-bottom strong {
    display: block;
    margin-bottom: 5px;
    color: #ffffff;
    font-size: 15px;
  }


  .about-save-bottom span {
    display: block;
    color: #7e8290;
    font-size: 13px;
  }


  .about-loading {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #0b0b0f;
    color: #9ca3af;
  }


  .about-spinner,
  .button-spinner {
    border-radius: 50%;
    border: 3px solid rgba(
      255,
      255,
      255,
      0.15
    );
    border-top-color: #c14dff;
    animation:
      aboutSpin 0.8s linear infinite;
  }


  .about-spinner {
    width: 34px;
    height: 34px;
    margin-bottom: 14px;
  }


  .button-spinner {
    width: 15px;
    height: 15px;
    border-width: 2px;
  }


  @keyframes aboutSpin {

    to {
      transform: rotate(360deg);
    }

  }


  @media (max-width: 900px) {

    .institute-about-page {
      padding: 24px 18px;
    }


    .about-header {
      align-items: flex-start;
      flex-direction: column;
    }


    .form-grid {
      grid-template-columns: 1fr;
    }


    .full-width {
      grid-column: auto;
    }


    .about-save-bottom {
      align-items: flex-start;
      flex-direction: column;
    }


    .about-save-bottom .save-button {
      width: 100%;
    }

  }


  @media (max-width: 600px) {

    .institute-about-page {
      padding: 18px 12px;
    }


    .about-editor-section {
      padding: 20px 16px;
      border-radius: 14px;
    }


    .about-header h1 {
      font-size: 30px;
    }


    .section-heading {
      gap: 12px;
    }


    .section-heading h2 {
      font-size: 19px;
    }


    .repeatable-header {
      align-items: flex-start;
      flex-direction: column;
    }


    .secondary-button {
      width: 100%;
    }

  }

`;


export default InstituteAbout;