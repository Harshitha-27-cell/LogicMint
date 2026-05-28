import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshing = false;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken && !refreshing) {
        refreshing = true;
        try {
          const { data } = await axios.post(`${API_URL}/api/auth/refresh`, {
            refreshToken
          });
          localStorage.setItem("token", data.accessToken || data.token);
          original.headers.Authorization = `Bearer ${data.accessToken || data.token}`;
          refreshing = false;
          return api(original);
        } catch {
          refreshing = false;
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
export { API_URL };
