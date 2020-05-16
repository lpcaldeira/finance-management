import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  responseType: "json",
  headers: {
    "Content-type": "application/json"
  }
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // config.headers.Type = "application/json";
  }
  return config;
});

export default api;
