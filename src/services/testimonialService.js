
import API from "./api";

/* =========================================================
   ADMIN
   GET ALL TESTIMONIALS
========================================================= */

export const getTestimonials = async () => {
  const response = await API.get(
    "/testimonials"
  );

  return response.data?.data || [];
};


/* =========================================================
   ADMIN
   CREATE TESTIMONIAL
========================================================= */

export const createTestimonial = async (
  formData
) => {
  const response = await API.post(
    "/testimonials",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};


/* =========================================================
   ADMIN
   UPDATE TESTIMONIAL
========================================================= */

export const updateTestimonial = async (
  id,
  formData
) => {
  if (!id) {
    throw new Error(
      "Testimonial ID is required"
    );
  }

  const response = await API.put(
    `/testimonials/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};


/* =========================================================
   ADMIN
   DELETE TESTIMONIAL
========================================================= */

export const deleteTestimonial = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Testimonial ID is required"
    );
  }

  const response = await API.delete(
    `/testimonials/${id}`
  );

  return response.data;
};


/* =========================================================
   INSTITUTE
   GET OWN TESTIMONIALS
========================================================= */

export const getInstituteTestimonials =
  async () => {
    try {
      console.log(
        "================================="
      );

      console.log(
        "GET INSTITUTE TESTIMONIALS"
      );

      console.log(
        "================================="
      );

      const response =
        await API.get(
          "/testimonials/institute",
          {
            params: {
              _t: Date.now(),
            },
          }
        );

      console.log(
        "Institute Testimonials Response:",
        response.data
      );

      const data =
        response.data?.data;

      if (Array.isArray(data)) {
        return data;
      }

      if (
        Array.isArray(
          response.data
        )
      ) {
        return response.data;
      }

      console.warn(
        "Unexpected testimonials response:",
        response.data
      );

      return [];

    } catch (error) {
      console.error(
        "Get Institute Testimonials API Error:",
        error
      );

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      throw error;
    }
  };


/* =========================================================
   INSTITUTE
   CREATE TESTIMONIAL
========================================================= */

export const createInstituteTestimonial =
  async (
    formData
  ) => {
    try {
      console.log(
        "Creating institute testimonial..."
      );

      const response =
        await API.post(
          "/testimonials/institute",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      console.log(
        "Create testimonial response:",
        response.data
      );

      return response.data;

    } catch (error) {
      console.error(
        "Create Institute Testimonial Error:",
        error
      );

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      throw error;
    }
  };


/* =========================================================
   INSTITUTE
   UPDATE TESTIMONIAL
========================================================= */

export const updateInstituteTestimonial =
  async (
    id,
    formData
  ) => {
    try {
      if (!id) {
        throw new Error(
          "Testimonial ID is required"
        );
      }

      const response =
        await API.put(
          `/testimonials/institute/${id}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      console.log(
        "Update testimonial response:",
        response.data
      );

      return response.data;

    } catch (error) {
      console.error(
        "Update Institute Testimonial Error:",
        error
      );

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      throw error;
    }
  };


/* =========================================================
   INSTITUTE
   DELETE TESTIMONIAL
========================================================= */

export const deleteInstituteTestimonial =
  async (
    id
  ) => {
    try {
      if (!id) {
        throw new Error(
          "Testimonial ID is required"
        );
      }

      const response =
        await API.delete(
          `/testimonials/institute/${id}`
        );

      console.log(
        "Delete testimonial response:",
        response.data
      );

      return response.data;

    } catch (error) {
      console.error(
        "Delete Institute Testimonial Error:",
        error
      );

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      throw error;
    }
  };