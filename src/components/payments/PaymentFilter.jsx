import { Search } from "lucide-react";

export default function PaymentFilter({ filters, setFilters, batches }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={filters.search || ""}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#151519] border border-[#2c2c35] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 text-sm"
        />
      </div>
      <select
        value={filters.status || ""}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="px-4 py-3 rounded-xl bg-[#151519] border border-[#2c2c35] text-white focus:outline-none focus:border-purple-500/60 text-sm"
      >
        <option value="">All Status</option>
        <option value="DUE">Due</option>
        <option value="PARTIAL">Partial</option>
        <option value="PAID">Paid</option>
      </select>
      <select
        value={filters.batch_id || ""}
        onChange={(e) => setFilters({ ...filters, batch_id: e.target.value })}
        className="px-4 py-3 rounded-xl bg-[#151519] border border-[#2c2c35] text-white focus:outline-none focus:border-purple-500/60 text-sm"
      >
        <option value="">All Batches</option>
        {batches.map(b => <option key={b.id} value={b.id}>{b.batch_name}</option>)}
      </select>
    </div>
  );
}