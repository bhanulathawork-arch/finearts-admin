import React, { useEffect, useState } from "react";
import {
  getFooter,
  updateFooter,
} from "../services/footer.service";

const InstituteFooter = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    description: "",
    facebook_url: "",
    instagram_url: "",
    youtube_url: "",
    address: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    loadFooter();
  }, []);

  const loadFooter = async () => {
    try {
      setLoading(true);

      const data = await getFooter();

      if (data) {
        setFormData({
          description: data.description || "",
          facebook_url: data.facebook_url || "",
          instagram_url: data.instagram_url || "",
          youtube_url: data.youtube_url || "",
          address: data.address || "",
          phone: data.phone || "",
          email: data.email || "",
        });
      }
    } catch (error) {
      console.error("GET FOOTER ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateFooter(formData);

      alert("Footer updated successfully");
    } catch (error) {
      console.error("UPDATE FOOTER ERROR:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to update footer"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading footer settings...
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Footer
        </h1>

        <p className="mt-2 text-gray-400">
          Manage the description, social links and
          contact information displayed in your
          website footer.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* DESCRIPTION */}

        <div className="rounded-2xl border border-gray-800 bg-[#17171c] p-6">
          <h2 className="mb-2 text-xl font-semibold">
            Footer Description
          </h2>

          <p className="mb-5 text-sm text-gray-400">
            Add a short description about your
            institute.
          </p>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Enter footer description..."
            className="w-full rounded-xl border border-gray-700 bg-[#0f0f14] px-4 py-3 text-white outline-none"
          />
        </div>

        {/* FOLLOW US */}

        <div className="rounded-2xl border border-gray-800 bg-[#17171c] p-6">
          <h2 className="mb-2 text-xl font-semibold">
            Follow Us
          </h2>

          <p className="mb-5 text-sm text-gray-400">
            Add your social media links.
          </p>

          <div className="space-y-5">

            <div>
              <label className="mb-2 block">
                Facebook URL
              </label>

              <input
                type="url"
                name="facebook_url"
                value={formData.facebook_url}
                onChange={handleChange}
                placeholder="https://facebook.com/..."
                className="w-full rounded-xl border border-gray-700 bg-[#0f0f14] px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block">
                Instagram URL
              </label>

              <input
                type="url"
                name="instagram_url"
                value={formData.instagram_url}
                onChange={handleChange}
                placeholder="https://instagram.com/..."
                className="w-full rounded-xl border border-gray-700 bg-[#0f0f14] px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block">
                YouTube URL
              </label>

              <input
                type="url"
                name="youtube_url"
                value={formData.youtube_url}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className="w-full rounded-xl border border-gray-700 bg-[#0f0f14] px-4 py-3 text-white outline-none"
              />
            </div>

          </div>
        </div>

        {/* CONTACT */}

        <div className="rounded-2xl border border-gray-800 bg-[#17171c] p-6">
          <h2 className="mb-2 text-xl font-semibold">
            Contact Us
          </h2>

          <p className="mb-5 text-sm text-gray-400">
            Add the contact information displayed
            in your website footer.
          </p>

          <div className="space-y-5">

            <div>
              <label className="mb-2 block">
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                placeholder="Enter institute address..."
                className="w-full rounded-xl border border-gray-700 bg-[#0f0f14] px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number..."
                className="w-full rounded-xl border border-gray-700 bg-[#0f0f14] px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address..."
                className="w-full rounded-xl border border-gray-700 bg-[#0f0f14] px-4 py-3 text-white outline-none"
              />
            </div>

          </div>
        </div>

        {/* QUICK LINKS */}

        <div className="rounded-2xl border border-gray-800 bg-[#17171c] p-6">
          <h2 className="mb-2 text-xl font-semibold">
            Quick Links
          </h2>

          <p className="mb-5 text-sm text-gray-400">
            These links are fixed and cannot be
            edited from the dashboard.
          </p>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              "Home",
              "About",
              "Classes",
              "Sessions",
              "Trainers",
              "Testimonials",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-700 bg-[#0f0f14] px-4 py-3 text-gray-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* SAVE */}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 font-semibold text-white disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InstituteFooter;