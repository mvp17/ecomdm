import { apiGatewayClient } from "@/lib/axiosInstance";
import { ProductRequest } from "@/types/Product";

export const getProducts = () => {
  return apiGatewayClient.get("/product");
};

export const createProduct = (productData: ProductRequest) => {
  return apiGatewayClient.post("/product", productData);
};

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
  return apiGatewayClient.post("/order", orderData);
};
