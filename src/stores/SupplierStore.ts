import { Supplier } from "@/types/Supplier";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface SupplierState {
  suppliers: Supplier[];
  getAll: () => void;
}

const suppliers: Supplier[] = [
    { id: 1, name: "Dhysiam", email: "dhysiam@mail.com", reference: "94g6fd6f8f41f1grg662" },
    { id: 2, name: "Julimna", email: "julimna@mail.com", reference: "rgregever852vdgrgr45e" },
    { id: 3, name: "Tairmco", email: "tairmco@mail.com", reference: "uykykyuktfece7452wgv6852" },
  ];

export const useSuppliersStore = create<SupplierState>()(
  immer(
    devtools((set) => ({
      suppliers: [],
      getAll: async () => {
        set((state) => {
          state.suppliers = suppliers;
        });
      },
    }))
  )
);
