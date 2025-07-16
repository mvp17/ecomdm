import { Product } from "@/types/Product";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";


interface ProductsState {
  maleProducts: Product[];
  femaleProducts: Product[];
  getAll: () => void;
  createProduct: (product: Product, token: string) => Promise<void>;
  updateProduct: (
    product: Product,
    ref: string,
    token: string
  ) => Promise<void>;
  deleteProduct: (id: string, token: string) => Promise<void>;
}

const maleProducts = [
  {
    id: 1,
    name: "Product 1",
    description: "This is a great product.",
    price: 19.99,
    skuCode: "SKU12345",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Another awesome item.",
    price: 29.99,
    skuCode: "SKU67890",
  },
  {
    id: 3,
    name: "Product 3",
    description: "You will love this!",
    price: 39.99,
    skuCode: "SKU11223",
  },
  {
    id: 4,
    name: "Product 4",
    description: "Best seller of the year.",
    price: 49.99,
    skuCode: "SKU44556",
  },
];

const femaleProducts = [
  {
    id: 10,
    name: "Product 10",
    description: "Great product.",
    price: 190.99,
    skuCode: "SKU12345",
  },
  {
    id: 20,
    name: "Product 20",
    description: "Awesome item.",
    price: 290.99,
    skuCode: "SKU67890",
  },
  {
    id: 30,
    name: "Product 30",
    description: "Love this!",
    price: 390.99,
    skuCode: "SKU11223",
  },
  {
    id: 40,
    name: "Product 40",
    description: "Best seller.",
    price: 490.99,
    skuCode: "SKU44556",
  },
];

export const useProductsStore = create<ProductsState>()(
  immer(
    devtools((set) => ({
      maleProducts: [],
      femaleProducts: [],
      getAll: async () => {
        set((state) => {
          state.maleProducts = maleProducts;
          state.femaleProducts = femaleProducts;
        });
      },
    }))
  )
);
