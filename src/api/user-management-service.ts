import { apiRestClient } from "@/lib/axiosInstance";

const SERVICE_URL = "/user/profile";

export const getProfileImage = async (userId: string) => {
  return apiRestClient.get(`${SERVICE_URL}/download-image/${userId}`);
};

export const uploadProfileImage = async (formData: FormData, userId: string) => {
  return apiRestClient.post(`${SERVICE_URL}/upload-image?userId=${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
