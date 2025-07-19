import { apiClient } from "@/lib/axiosInstance";

const SERVICE_URL = "/user/profile";

export const getProfileImage = async (userId: string) => {
  return apiClient.get(`${SERVICE_URL}/download-image/${userId}`);
};

export const uploadProfileImage = async (formData: FormData) => {
  return apiClient.post(`${SERVICE_URL}/upload-image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
