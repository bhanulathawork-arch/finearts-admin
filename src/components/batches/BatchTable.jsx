
import { Eye, Edit, Trash2, Users } from "lucide-react";

export default function BatchTable({
  batches = [],
  onView,
  onEdit,
  onDelete,
  onAssign,
}) {
  const batchList = Array.isArray(batches) ? batches : [];

  if (batchList.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No batches found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#202027] text-white text-sm">
          <tr>
            <th className="p-4 text-left">Code</th>
            <th className="p-4 text-left">Batch Name</th>
            <th className="p-4 text-left">Trainer</th>
            <th className="p-4 text-left">Timings</th>
            <th className="p-4 text-left">Students</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

       <tbody>
  {batchList.map((b) => (
    <tr
      key={b.id}
      className="border-t border-[#2c2c35] hover:bg-[#1a1a20]"
    >
      <td className="p-4 text-purple-400">
        {b.batch_code}
      </td>

      <td className="p-4 text-white">
        {b.batch_name}
      </td>

      <td className="p-4 text-gray-300">
        {b.trainer_name || "-"}
      </td>

      <td className="p-4 text-gray-300">
        {b.start_time} - {b.end_time}
      </td>

      <td className="p-4 text-white">
        {b.current_students}/{b.max_students}
      </td>

      <td className="p-4">
        {b.status}
      </td>

      <td className="p-4 flex gap-2">
        <button onClick={() => onView(b.id)}>
          <Eye size={18} />
        </button>

        <button onClick={() => onAssign(b.id)}>
          <Users size={18} />
        </button>

        <button onClick={() => onEdit(b.id)}>
          <Edit size={18} />
        </button>

        <button onClick={() => onDelete(b.id)}>
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}