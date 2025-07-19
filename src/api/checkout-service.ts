import { Cart } from "@/components/Cart/Cart";
import { apiClient } from "@/lib/axiosInstance";

export const postCheckout = (cartItems: Cart[]) => {
  return apiClient.post("/checkout", cartItems);
};
