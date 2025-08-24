import { Product } from "@/types/Product";

export type Cart = Product & {
  quantity: number;
};
