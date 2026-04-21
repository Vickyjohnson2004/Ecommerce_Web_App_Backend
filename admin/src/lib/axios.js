import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://10.147.66.225:3000/api",
  withCredentials: true, // by adding this field browser will send the cookies to server automatically, on every single req
});

export default axiosInstance;
