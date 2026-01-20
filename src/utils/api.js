import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

export const authFetch = (config) => {
  const token = localStorage.getItem("token");

  return api({
    ...config,
    headers: {
      ...(config.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

export default api;
