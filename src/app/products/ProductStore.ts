import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Product } from "./Product";

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
    title: "Product 1",
    description: "This is a great product.",
    price: 19.99,
  },
  {
    id: 2,
    title: "Product 2",
    description: "Another awesome item.",
    price: 29.99,
  },
  {
    id: 3,
    title: "Product 3",
    description: "You will love this!",
    price: 39.99,
  },
  {
    id: 4,
    title: "Product 4",
    description: "Best seller of the year.",
    price: 49.99,
  },
];

const femaleProducts = [
  {
    id: 10,
    title: "Product 10",
    description: "Great product.",
    price: 190.99,
  },
  {
    id: 20,
    title: "Product 20",
    description: "Awesome item.",
    price: 290.99,
  },
  {
    id: 30,
    title: "Product 30",
    description: "Love this!",
    price: 390.99,
  },
  {
    id: 40,
    title: "Product 40",
    description: "Best seller.",
    price: 490.99,
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
