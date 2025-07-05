import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { WishList } from "./WishList";

interface WishListState {
  wishListItems: WishList[];
  addItem: (item: WishList) => void;
  removeItem: (id: number) => void;
  resetWishList: () => void;
}

export const useWishListStore = create<WishListState>()(
  immer(
    devtools((set) => ({
      wishListItems: [],
      addItem: (item) => {
        set((state) => {
          if (state.wishListItems.some((p) => p.id === item.id)) {
            state.wishListItems = state.wishListItems.filter(
              (p) => p.id !== item.id
            );
            return;
          }
          state.wishListItems = [...state.wishListItems, item];
        });
      },
      removeItem: (id) =>
        set((state) => ({
          wishListItems: state.wishListItems.filter((item) => item.id !== id),
        })),
      resetWishList: () => set(() => ({ wishListItems: [] })),
    }))
  )
);
