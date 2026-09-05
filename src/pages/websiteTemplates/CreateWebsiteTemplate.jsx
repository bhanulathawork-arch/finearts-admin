import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TemplateForm from "../../components/admin/websiteTemplates/TemplateForm";

import {
  createAdminWebsiteTemplate,
} from "../../services/adminWebsiteTemplateService";

export default function CreateWebsiteTemplate() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (form) => {
    try {
      setLoading(true);

      await createAdminWebsiteTemplate(form);

      alert(
        "Website template created successfully"
      );

      navigate("/admin/website-templates");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to create template"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold text-white">
        Create Website Template
      </h1>

      <p className="text-gray-400 mt-2 mb-8">
        Create an arts-specific website template
        for institutes.
      </p>

      <TemplateForm
        onSubmit={handleSubmit}
        loading={loading}
      />

    </div>
  );
}