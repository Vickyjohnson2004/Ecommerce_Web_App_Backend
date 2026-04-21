import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://10.147.66.225:3000/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000, // ✅ prevent hanging requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* -------------------------
   REQUEST INTERCEPTOR
-------------------------- */
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync("auth_token");

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (err) {
      console.log("Token read error:", err);
      return config;
    }
  },
  (error) => Promise.reject(error),
);

/* -------------------------
   RESPONSE INTERCEPTOR
-------------------------- */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      try {
        await SecureStore.deleteItemAsync("auth_token");
        console.log("Token expired → removed from storage");
      } catch (err) {
        console.log("Failed to clear token:", err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
