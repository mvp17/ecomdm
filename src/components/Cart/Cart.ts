import { Product } from "@/app/products/Product";

export type Cart = Product & {
  quantity: number;
};
