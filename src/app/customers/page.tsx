"use client";

import React, { useEffect } from "react";
import Table from "@/ui/Table";
import { Column } from "@/types/Column";
import { Customer } from "@/types/Customer";
import withAuthGuard from "@/utils/withAuthGuard";
import { useCustomersStore } from "@/stores/CustomerStore";

const CustomersPage = () => {
  const customers = useCustomersStore((state) => state.customers);
  const getAllCustomers = useCustomersStore((state) => state.getAll);

  // TODO: Use React Query for data fetching
  useEffect(() => {
    if (customers.length === 0) getAllCustomers();
  });

  const columns: Column<Customer>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: false },
    { key: "age", label: "Age", sortable: true },
  ];
  columns.push({
    key: "actions",
    label: "Actions",
    render: (_, row: Customer) => (
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
      <h1 className="text-2xl font-bold mb-6">Customers</h1>
      <Table columns={columns} data={customers} />
    </div>
  );
};

export default withAuthGuard(CustomersPage);
