import { apiClient } from "@/lib/axiosInstance";
import { Product } from "@/types/Product";

export const getReport = async (product: Product) => {
  return await apiClient.post("/report", product);
};
