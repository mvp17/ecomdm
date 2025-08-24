import { apiRestClient } from "@/lib/axiosInstance";
import { Product } from "@/types/Product";

export const getReport = async (product: Product) => {
  return await apiRestClient.post("/report", product);
};
