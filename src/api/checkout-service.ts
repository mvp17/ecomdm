import { Cart } from "@/components/Cart/Cart";
import { apiRestClient } from "@/lib/axiosInstance";

export const postCheckout = (cartItems: Cart[]) => {
  return apiRestClient.post("/checkout", cartItems);
};
