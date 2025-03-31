import api from "./Config.jsx";

export const authService = {
  signup: async (userData) => {
    try {
      const { data } = await api.post("/api/auth/signup", userData);

      if (data?.token) {
        authService.storeUserData(data.user, data.token);
      }

      return data;
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || error.message);
      throw error.response?.data || { message: "Signup failed" };
    }
  },

  login: async (credentials) => {
    try {
      const { data } = await api.post("/api/auth/login", credentials);

      if (data?.token) {
        authService.storeUserData(data.user, data.token);
      }

      return data;
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      throw error.response?.data || { message: "Login failed" };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  updateProfile: async (userData) => {
    try {
      const { data } = await api.put("/api/settings", userData);
      return data;
    } catch (error) {
      console.error("Profile update failed:", error.message);
      throw error.response?.data || { message: "Profile update failed" };
    }
  },

  getToken: () => localStorage.getItem("token"),

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  storeUserData: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }
};
