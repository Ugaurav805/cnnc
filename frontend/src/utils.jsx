import axios from "axios";
import { toast } from "react-toastify";

// Create API instance with base URL
const api = axios.create({
  baseURL: "https://meetingeventplaner-cnnct.onrender.com",
});

// ✅ Handle API Errors
export const handleError = (error) => {
  console.error("Error:", error);
  const errorMessage = error.response?.data?.message || "An error occurred";
  toast.error(errorMessage); // Show error notification
  return errorMessage;
};

// ✅ Handle API Success
export const handleSuccess = (message) => {
  toast.success(message);
};

// ✅ Attach Token to API Requests
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

export default api;
