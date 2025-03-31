import axios from "axios";

const api = axios.create({
  baseURL: "https://meetingeventplaner-cnnct.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// 🔹 Attach Authorization token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Handle API errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data?.message || error.message);

    // Optional: Automatically logout on 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/signin"; // Redirect to login page
    }

    return Promise.reject(error);
  }
);

export default api;
