import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Accept-Language": 'es'
  }
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
