import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import TemplateForm from "../../components/admin/websiteTemplates/TemplateForm";

import {
  getAdminWebsiteTemplate,
  updateAdminWebsiteTemplate,
} from "../../services/adminWebsiteTemplateService";

export default function EditWebsiteTemplate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [template, setTemplate] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data =
          await getAdminWebsiteTemplate(id);

        setTemplate(data);
      } catch (error) {
        alert(
          error?.response?.data?.message ||
            "Failed to load template"
        );

        navigate("/admin/website-templates");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, navigate]);

  const handleSubmit = async (form) => {
    try {
      setSaving(true);

      await updateAdminWebsiteTemplate(
        id,
        form
      );

      alert(
        "Website template updated successfully"
      );

      navigate("/admin/website-templates");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to update template"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold text-white">
        Edit Website Template
      </h1>

      <p className="text-gray-400 mt-2 mb-8">
        Update your arts website template.
      </p>

      <TemplateForm
        initialData={template}
        onSubmit={handleSubmit}
        loading={saving}
        submitText="Update Template"
      />

    </div>
  );
}