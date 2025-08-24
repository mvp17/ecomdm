import { Customer } from "@/types/Customer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface CustomersState {
  customers: Customer[];
  getAll: () => void;
}

const customers: Customer[] = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 28 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 32 },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", age: 24 },
];

export const useCustomersStore = create<CustomersState>()(
  immer(
    devtools((set) => ({
      customers: [],
      getAll: async () => {
        set((state) => {
          state.customers = customers;
        });
      },
    }))
  )
);
