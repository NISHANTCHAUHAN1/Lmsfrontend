import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // It's safer to get the token directly without JSON.parse,
    // unless you are certain it's stored as a JSON string.
    // This avoids potential parsing errors.
    const tokenItem = sessionStorage.getItem("accessToken");
    // The token might be stored with quotes if it was stringified, so we can remove them.
    const accessToken = tokenItem ? tokenItem.replace(/"/g, "") : null;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);


export default axiosInstance;
