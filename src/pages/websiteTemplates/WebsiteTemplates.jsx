import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi";

import TemplateCard from "../../components/admin/websiteTemplates/TemplateCard";

import {
  getAdminWebsiteTemplates,
  toggleAdminWebsiteTemplateStatus,
  deleteAdminWebsiteTemplate,
} from "../../services/adminWebsiteTemplateService";

export default function WebsiteTemplates() {
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTemplates = async () => {
    try {
      setLoading(true);

      const data =
        await getAdminWebsiteTemplates();

      setTemplates(data || []);
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message ||
          "Failed to load templates"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const handleToggle = async (template) => {
    try {
      await toggleAdminWebsiteTemplateStatus(
        template.id
      );

      await loadTemplates();
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to update status"
      );
    }
  };

  const handleDelete = async (template) => {
    const confirmed = window.confirm(
      `Delete "${template.name}"?`
    );

    if (!confirmed) return;

    try {
      await deleteAdminWebsiteTemplate(
        template.id
      );

      await loadTemplates();
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to delete template"
      );
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading templates...
      </div>
    );
  }

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Website Templates
          </h1>

          <p className="text-gray-400 mt-2">
            Create and manage templates available
            to institutes.
          </p>
        </div>

        <button
          onClick={() =>
            navigate(
              "/admin/website-templates/create"
            )
          }
          className="px-5 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700"
        >
          <HiOutlinePlus className="inline mr-2" />
          Create Template
        </button>

      </div>

      {/* Empty */}
      {templates.length === 0 && (
        <div className="bg-[#15151A] border border-[#292932] rounded-2xl p-12 text-center">
          <h2 className="text-xl text-white">
            No website templates
          </h2>

          <p className="text-gray-400 mt-2">
            Create your first arts website template.
          </p>
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onEdit={(item) =>
              navigate(
                `/admin/website-templates/${item.id}/edit`
              )
            }
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}

      </div>

    </div>
  );
}