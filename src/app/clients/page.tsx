"use client";

import React from "react";
import Table from "@/ui/Table";
import { Column } from "@/types/Column";
import { User } from "@/types/User";

const ClientsPage = () => {
  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", age: 28 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 32 },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", age: 24 },
  ];

  const columns: Column<User>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: false },
    { key: "age", label: "Age", sortable: true },
  ];
  columns.push({
    key: "actions",
    label: "Actions",
    render: (_, row: User) => (
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
      <h1 className="text-2xl font-bold mb-6">Clients</h1>
      <Table columns={columns} data={users} />
    </div>
  );
};

export default ClientsPage;
