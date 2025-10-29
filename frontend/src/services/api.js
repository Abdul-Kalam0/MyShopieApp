import axios from "axios";

const api = axios.create({
  baseURL: "https://my-shopie-app.vercel.app", // ✅ BACKEND URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // ✅ Only add header IF token exists
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const get = (url, config) => api.get(url, config).then((r) => r.data);
export const post = (url, data, config) =>
  api.post(url, data, config).then((r) => r.data);
export const put = (url, data, config) =>
  api.put(url, data, config).then((r) => r.data);
export const del = (url, data, config) =>
  api.delete(url, { data, ...(config || {}) }).then((r) => r.data);

export default api;
