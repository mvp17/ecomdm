import { Column } from "@/types/Column";
import React, { useState } from "react";

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

const Table = <T,>({ columns, data, onRowClick }: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aValue = a[key];
    const bValue = b[key];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    }
    return direction === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  return (
    <table className="min-w-full border border-gray-300 shadow-lg rounded-md">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              onClick={() => col.sortable && handleSort(col.key as keyof T)}
              className={`p-2 border-b ${
                col.sortable ? "hover:bg-gray-200 cursor-pointer" : ""
              }`}
            >
              {col.label}{" "}
              {col.sortable &&
                (sortConfig?.key === col.key
                  ? sortConfig.direction === "asc"
                    ? "⬆️"
                    : "⬇️"
                  : "↕️")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-b hover:bg-gray-50 "
            onClick={() => onRowClick && onRowClick(row)}
          >
            {columns.map((col) => (
              <td key={String(col.key)} className="p-2 text-center">
                {col.render
                  ? col.render(row[col.key as keyof T], row)
                  : (row[col.key as keyof T] as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
