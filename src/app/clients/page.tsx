"use client";

import React from "react";
import Table from "@/ui/Table";

const ClientsPage = () => {
  type User = {
    id: number;
    name: string;
    email: string;
    age: number;
  };

  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", age: 28 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 32 },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", age: 24 },
  ];

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: false },
    { key: "age", label: "Age", sortable: true },
    {
      key: "actions",
      label: "Actions",
      // @ts-expect-error ignore
      render: (_, row: User) => (
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
          onClick={() => alert(`Editing ${row.name}`)}
        >
          Edit
        </button>
      ),
    },
  ];
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Clients</h1>
      <Table
        // @ts-expect-error ignore
        columns={columns}
        data={users}
      />
    </div>
  );
};

export default ClientsPage;
