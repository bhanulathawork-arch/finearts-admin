
import { useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiSearch,
  HiFilter,
} from "react-icons/hi";
import { HiChevronUpDown } from "react-icons/hi2";

export default function DataTable({
  columns,
  data = [],
  searchable = true,
  filterable = false,
  filterOptions = [],
  pageSize = 10,
  actions,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  /* ---------------- FILTER SAFE DATA ---------------- */
  let filteredData = (data || [])
    .filter((item) => item) // remove null/undefined rows
    .filter((item) => {
      const matchesSearch = Object.values(item || {}).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      );

      const matchesFilter =
        selectedFilter === "all" ||
        (filterOptions.length > 0 &&
          item?.[filterOptions[0].key] === selectedFilter);

      return matchesSearch && matchesFilter;
    });

  /* ---------------- SORT SAFE ---------------- */
  if (sortConfig.key) {
    filteredData.sort((a, b) => {
      const aVal = a?.[sortConfig.key];
      const bVal = b?.[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + pageSize,
  );

  const handleSort= (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };




  return (
    <div className="space-y-4">
      {/* ---------------- SEARCH & FILTER ---------------- */}
      {(searchable || filterable) && (
        <div className="flex flex-col sm:flex-row gap-4">
          {searchable && (
            <div className="relative flex-1">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary-purple/50 transition-all"
              />
            </div>
          )}

          {filterable && filterOptions.length > 0 && (
            <div className="relative">
              <HiFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <select
                value={selectedFilter}
                onChange={(e) => {
                  setSelectedFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-8 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white appearance-none cursor-pointer"
              >
                <option value="all">All</option>
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* ---------------- TABLE ---------------- */}
      <div className="glass-effect rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    onClick={() =>
                      column.sortable !== false && handleSort(column.key)
                    }
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      <HiChevronUpDown className="w-4 h-4" />
                    </div>
                  </th>
                ))}

                {actions && (
                  <th className="px-6 py-4 text-right text-xs text-gray-400">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <tr
                    key={row?.id ?? index}
                    className="hover:bg-white/5 transition-colors"
                  >
                    {columns.map((column) => {
                      const value = row?.[column.key];

                      return (
                        <td
                          key={column.key}
                          className="px-6 py-4 text-sm"
                        >
                          {column.render
                            ? column.render(value, row)
                            : value ?? "-"}
                        </td>
                      );
                    })}

                    {actions && (
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {row && actions(row)}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ---------------- PAGINATION ---------------- */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
            <p className="text-sm text-gray-400">
              Showing {startIndex + 1}-
              {Math.min(
                startIndex + pageSize,
                filteredData.length,
              )}{" "}
              of {filteredData.length}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.max(1, p - 1))
                }
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-50"
              >
                <HiChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-lg text-sm ${
                    currentPage === i + 1
                      ? "gradient-bg text-white"
                      : "text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(totalPages, p + 1),
                  )
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-50"
              >
                <HiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}