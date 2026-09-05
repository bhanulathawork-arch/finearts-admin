import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
} from "react-icons/hi";

export default function TemplateCard({
  template,
  onEdit,
  onToggle,
  onDelete,
}) {
  return (
    <div className="bg-[#15151A] border border-[#292932] rounded-2xl overflow-hidden">

      {/* Preview */}
      <div className="h-52 bg-[#202027] overflow-hidden">
        {template.preview_image ? (
          <img
            src={template.preview_image}
            alt={template.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Preview
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div>
            <h3 className="text-xl font-semibold text-white">
              {template.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {template.template_key}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              template.is_active
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {template.is_active
              ? "ACTIVE"
              : "INACTIVE"}
          </span>

        </div>

        <p className="text-gray-400 mt-4 line-clamp-3">
          {template.description ||
            "No description available."}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-6">

          <button
            onClick={() => onEdit(template)}
            className="flex-1 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
          >
            <HiOutlinePencil className="inline mr-1" />
            Edit
          </button>

          <button
            onClick={() => onToggle(template)}
            className="px-4 py-2 rounded-lg bg-[#25252D] text-white hover:bg-[#30303A]"
          >
            {template.is_active
              ? "Disable"
              : "Enable"}
          </button>

          <button
            onClick={() => onDelete(template)}
            className="p-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
          >
            <HiOutlineTrash />
          </button>

        </div>
      </div>
    </div>
  );
}