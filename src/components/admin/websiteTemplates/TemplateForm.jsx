import { useEffect, useState } from "react";

import {
  uploadTemplatePreview,
} from "../../../services/adminWebsiteTemplateService";

const EMPTY_FORM = {
  name: "",
  description: "",
  template_key: "",
  preview_image: "",
  is_active: true,
};

export default function TemplateForm({
  initialData,
  onSubmit,
  loading,
  submitText = "Create Template",
}) {
  const [form, setForm] =
    useState(EMPTY_FORM);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  // =========================================================
  // LOAD INITIAL DATA FOR EDIT
  // =========================================================

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        description:
          initialData.description || "",
        template_key:
          initialData.template_key || "",
        preview_image:
          initialData.preview_image || "",
        is_active:
          Boolean(initialData.is_active),
      });

      setImagePreview(
        initialData.preview_image || ""
      );
    }
  }, [initialData]);

  // =========================================================
  // HANDLE TEXT INPUTS
  // =========================================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =========================================================
  // HANDLE IMAGE SELECTION
  // =========================================================

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // -------------------------------------------------------
    // Allowed file types
    // -------------------------------------------------------

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      );

      e.target.value = "";
      return;
    }

    // -------------------------------------------------------
    // Maximum 5 MB
    // -------------------------------------------------------

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert(
        "Template preview image must be less than 5 MB."
      );

      e.target.value = "";
      return;
    }

    // -------------------------------------------------------
    // Store selected file
    // -------------------------------------------------------

    setSelectedFile(file);

    // -------------------------------------------------------
    // Show local preview before S3 upload
    // -------------------------------------------------------

    const localPreview =
      URL.createObjectURL(file);

    setImagePreview(localPreview);
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let previewImageUrl =
        form.preview_image;

      // -----------------------------------------------------
      // Upload selected image to S3
      // -----------------------------------------------------

      if (selectedFile) {
        setUploading(true);

        const uploaded =
          await uploadTemplatePreview(
            selectedFile
          );

        previewImageUrl =
          uploaded.url;

        setUploading(false);
      }

      // -----------------------------------------------------
      // Send template data to parent
      // -----------------------------------------------------

      await onSubmit({
        ...form,

        preview_image:
          previewImageUrl,
      });
    } catch (error) {
      console.error(
        "Template submission error:",
        error
      );

      setUploading(false);

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to upload template image"
      );
    }
  };

  const isSaving =
    loading || uploading;

  // =========================================================
  // UI
  // =========================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl"
    >

      {/* =====================================================
          TEMPLATE NAME
      ===================================================== */}

      <div className="mb-5">
        <label className="block text-white mb-2">
          Template Name
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Modern Art Academy"
          required
          className="w-full px-4 py-3 rounded-xl bg-[#15151A] border border-[#33333D] text-white outline-none focus:border-purple-500"
        />
      </div>

      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <div className="mb-5">
        <label className="block text-white mb-2">
          Description
        </label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe this arts website template..."
          className="w-full px-4 py-3 rounded-xl bg-[#15151A] border border-[#33333D] text-white outline-none focus:border-purple-500"
        />
      </div>

      {/* =====================================================
          TEMPLATE KEY
      ===================================================== */}

      <div className="mb-5">
        <label className="block text-white mb-2">
          Template Key
        </label>

        <input
          type="text"
          name="template_key"
          value={form.template_key}
          onChange={handleChange}
          placeholder="modern-art-academy"
          required
          className="w-full px-4 py-3 rounded-xl bg-[#15151A] border border-[#33333D] text-white outline-none focus:border-purple-500"
        />

        <p className="text-gray-500 text-sm mt-2">
          This key connects the database template
          with the actual website design.
        </p>
      </div>

      {/* =====================================================
          TEMPLATE PREVIEW IMAGE
      ===================================================== */}

      <div className="mb-6">

        <label className="block text-white mb-2">
          Template Preview Image
        </label>

        <div className="border-2 border-dashed border-[#33333D] rounded-xl p-6 bg-[#15151A]">

          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={isSaving}
            className="w-full text-gray-300"
          />

          <p className="text-gray-500 text-sm mt-3">
            JPG, JPEG, PNG or WEBP
            <br />
            Maximum file size: 5 MB
          </p>

        </div>
      </div>

      {/* =====================================================
          IMAGE PREVIEW
      ===================================================== */}

      {imagePreview && (
        <div className="mb-6">

          <label className="block text-white mb-2">
            Preview
          </label>

          <div className="relative rounded-xl overflow-hidden border border-[#33333D]">

            <img
              src={imagePreview}
              alt="Template preview"
              className="w-full max-h-80 object-cover"
            />

            {/* Upload overlay */}

            {uploading && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">

                <div className="text-center">

                  <div className="text-white text-lg font-semibold">
                    Uploading image...
                  </div>

                  <div className="text-gray-400 text-sm mt-1">
                    Saving to S3
                  </div>

                </div>

              </div>
            )}

          </div>

        </div>
      )}

      {/* =====================================================
          ACTIVE STATUS
      ===================================================== */}

      <label className="flex items-center gap-3 text-white mb-8 cursor-pointer">

        <input
          type="checkbox"
          name="is_active"
          checked={form.is_active}
          onChange={handleChange}
          disabled={isSaving}
          className="w-5 h-5"
        />

        <span>
          Make template available to institutes
        </span>

      </label>

      {/* =====================================================
          SUBMIT
      ===================================================== */}

      <button
        type="submit"
        disabled={isSaving}
        className="px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading
          ? "Uploading Image..."
          : loading
          ? "Saving..."
          : submitText}
      </button>

    </form>
  );
}