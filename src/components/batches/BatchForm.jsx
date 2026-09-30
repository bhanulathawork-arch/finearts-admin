


import { useState, useEffect } from "react";

export default function BatchForm({
  initialData = null,
  categories = [],
  subcategories = [],
  trainers = [],
  onSubmit,
  loading = false,
  submitText = "Save Batch",
}) {
  const [formData, setFormData] = useState({
    batch_name: "",
    category_id: "",
    subcategory_id: "",
    trainer_id: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    learning_mode: "OFFLINE",
    max_students: 30,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        batch_name: initialData.batch_name || "",
        category_id: initialData.category_id || "",
        subcategory_id: initialData.subcategory_id || "",
        trainer_id: initialData.trainer_id || "",
        start_date: initialData.start_date
          ? initialData.start_date.substring(0, 10)
          : "",
        end_date: initialData.end_date
          ? initialData.end_date.substring(0, 10)
          : "",
        start_time: initialData.start_time || "",
        end_time: initialData.end_time || "",
        learning_mode: initialData.learning_mode || "OFFLINE",
        max_students: initialData.max_students || 30,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category_id") {
      setFormData((prev) => ({
        ...prev,
        category_id: value,
        subcategory_id: "",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const filteredSubcategories = subcategories.filter(
    (item) => String(item.category_id) === String(formData.category_id)
  );

  const inputClass =
    "w-full rounded-xl bg-[#2b2638] border border-[#3b3449] px-4 py-3 text-white focus:outline-none focus:border-purple-500";

  const labelClass =
    "block mb-2 text-sm font-medium text-gray-300";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Batch Name */}
      <div className="md:col-span-2">
        <label className={labelClass}>Batch Name *</label>

        <input
          type="text"
          name="batch_name"
          value={formData.batch_name}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className={labelClass}>Category *</label>

        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className={inputClass}
          required
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory */}
      <div>
        <label className={labelClass}>Subcategory *</label>

        <select
          name="subcategory_id"
          value={formData.subcategory_id}
          onChange={handleChange}
          className={inputClass}
          disabled={!formData.category_id}
          required
        >
          <option value="">Select Subcategory</option>

          {filteredSubcategories.map((subcategory) => (
            <option
              key={subcategory.id}
              value={subcategory.id}
            >
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>

      {/* Trainer */}
      <div>
        <label className={labelClass}>Trainer</label>

        <select
          name="trainer_id"
          value={formData.trainer_id}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select Trainer</option>

          {trainers.map((trainer) => (
            <option
              key={trainer.id}
              value={trainer.id}
            >
              {trainer.full_name}
            </option>
          ))}
        </select>
      </div>

      {/* Maximum Students */}
      <div>
        <label className={labelClass}>Maximum Students</label>

        <input
          type="number"
          min="1"
          name="max_students"
          value={formData.max_students}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Start Date */}
      <div>
        <label className={labelClass}>Start Date *</label>

        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>

      {/* End Date */}
      <div>
        <label className={labelClass}>End Date *</label>

        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>

      {/* Start Time */}
      <div>
        <label className={labelClass}>Start Time *</label>

        <input
          type="time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>

      {/* End Time */}
      <div>
        <label className={labelClass}>End Time *</label>

        <input
          type="time"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>

      {/* Learning Mode */}
      <div>
        <label className={labelClass}>Learning Mode</label>

        <select
          name="learning_mode"
          value={formData.learning_mode}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="OFFLINE">Offline</option>
          <option value="ONLINE">Online</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="md:col-span-2 flex justify-end gap-4 border-t border-[#34303d] pt-6">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-[#2b2638]"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold disabled:opacity-60"
        >
          {loading ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );
}