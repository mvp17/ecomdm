import { apiClient } from "@/lib/axiosInstance";
import { ProductRequest } from "@/types/Product";

export const getProducts = () => {
  return apiClient.get("/product");
};



export const createProduct = (productData: ProductRequest) => {
  return apiClient.post("/product", productData);
}

type OrderRequest = {
  skuCode: string;
  price: number;
  quantity: number;
  userDetails: {
    email: string;
    firstName: string;
    lastName: string;
  };
};
export const createOrder = (orderData: OrderRequest) => {
  return apiClient.post("/order", orderData);
};
