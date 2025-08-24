"use client";

import React, { useEffect } from "react";
import Table from "@/ui/Table";
import { Column } from "@/types/Column";
import { Supplier } from "@/types/Supplier";
import withAuthGuard from "@/utils/withAuthGuard";
import { useSuppliersStore } from "@/stores/SupplierStore";

const SuppliersPage = () => {
  const suppliers = useSuppliersStore((state) => state.suppliers);
  const getAllSuppliers = useSuppliersStore((state) => state.getAll);

  // TODO: Use React Query for data fetching
  useEffect(() => {
    if (suppliers.length === 0) getAllSuppliers();
  });

  const columns: Column<Supplier>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: false },
    { key: "reference", label: "Reference", sortable: true },
  ];
  columns.push({
    key: "actions",
    label: "Actions",
    render: (_, row: Supplier) => (
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
        onClick={() => alert(`Editing ${row.name}`)}
      >
        Edit
      </button>
    ),
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Suppliers</h1>
      <Table columns={columns} data={suppliers} />
    </div>
  );
};

export default withAuthGuard(SuppliersPage);
