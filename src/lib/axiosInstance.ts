import axios, { AxiosRequestHeaders } from "axios";
import { environment } from "@/config/environment";
import { useToastStore } from "@/ui/toast/toastStore";
import keycloak from "@/lib/keycloak";

// Create an Axios instance with default settings
export const apiRestClient = axios.create({
  baseURL: environment.apiRestUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiGatewayClient = axios.create({
  baseURL: environment.apiGatewayUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiGatewayClient.interceptors.request.use(async (config) => {
  if (keycloak && keycloak.token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${keycloak.token}`,
    } as AxiosRequestHeaders;
  }
  return config;
});

// Add an interceptor to catch errors
apiRestClient.interceptors.response.use(
  (response) => response, // Pass successful responses
  (error) => {
    const message =
      error.response?.data?.message ||
      "A network error occurred. Please try again later.";

    useToastStore.getState().addToast(message, "error");

    return Promise.reject(error); // Still reject the error so it can be caught if needed
  }
);
apiGatewayClient.interceptors.response.use(
  (response) => response, // Pass successful responses
  (error) => {
    const message =
      error.response?.data?.message ||
      "A network error occurred. Please try again later.";

    useToastStore.getState().addToast(message, "error");

    return Promise.reject(error); // Still reject the error so it can be caught if needed
  }
);
