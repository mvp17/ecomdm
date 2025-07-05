import { Product } from "@/app/products/Product";

export type WishList = Product & {
  addedAt: string; // Timestamp when the product was added to the wishlist
  notes: string; // Optional user notes about why they added it
  priority: string; // Priority level for the wishlist item
};
