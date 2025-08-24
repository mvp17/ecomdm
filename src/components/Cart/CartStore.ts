import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Product } from "@/types/Product";
import { Cart } from "./Cart";

interface CartState {
  cartItems: Cart[];
  addItem: (item: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  resetCart: () => void;
}

export const useCartStore = create<CartState>()(
  immer(
    devtools((set) => ({
      cartItems: [],
      addItem: (item) => {
        set((state) => {
          if (state.cartItems.some((p) => p.id === item.id)) {
            state.cartItems = state.cartItems.map((p) =>
              p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
            );
            return;
          }
          state.cartItems = [...state.cartItems, { ...item, quantity: 1 }];
        });
      },
      increaseQuantity: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decreaseQuantity: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        })),
      resetCart: () => set(() => ({ cartItems: [] })),
    }))
  )
);
