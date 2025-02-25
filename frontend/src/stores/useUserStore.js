import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-toastify";

const styles = {
  loadingStyle: {
    style: { backgroundColor: "#233043", color: "#ffffff" },
    position: "top-center",
  },
  errorStyle: {
    position: "top-center",
    autoClose: 3000,
    style: { backgroundColor: "#233043", color: "#ffffff" },
  },
  successStyle: {
    position: "top-center",
    autoClose: 3000,
    style: { backgroundColor: "#233043", color: "#ffffff" },
  },
};

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/signup", {
        name,
        email,
        password,
        confirmPassword,
      });

      set({ user: res.data, loading: false });

      toast.success("Signup successful! Please verify your email.", {
        ...styles.successStyle,
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "An error occurred", {
        ...styles.errorStyle,
      });
    }
  },

  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });

      set({ user: res.data, loading: false });

      toast.success("Login successful!", {
        ...styles.successStyle,
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Invalid credentials", {
        ...styles.errorStyle,
      });
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
      toast.success("Logged out successfully!", {
        ...styles.successStyle,
      });
    } catch (error) {
      toast.error("Logout failed, please try again.", {
        ...styles.errorStyle,
      });
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      console.log(error.message);
      set({ checkingAuth: false, user: null });
    }
  },

  verifyEmail: async (email, verificationToken) => {
    set({ loading: true });

    try {
      await axios.post("/auth/verify-email", { email, verificationToken });

      set((state) => ({
        user: { ...state.user, isVerified: true },
        loading: false,
      }));

      toast.success("Email verified successfully!", {
        ...styles.successStyle,
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Verification failed", {
        ...styles.errorStyle,
      });
    }
  },

  resendVerificationEmail: async (email) => {
    set({ loading: true });

    try {
      await axios.post("/auth/resend-verification-email", { email });

      set({ loading: false });

      toast.success("Verification email sent successfully!", {
        ...styles.successStyle,
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Error sending email", {
        ...styles.errorStyle,
      });
    }
  },

  deleteAccount: async (email) => {
    set({ loading: true });

    try {
      await axios.delete("/auth/delete-account", { email });

      set({ user: null, loading: false });

      toast.success("Account deleted successfully.", {
        ...styles.successStyle,
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Error deleting account", {
        ...styles.errorStyle,
      });
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;

    set({ checkingAuth: true });

    try {
      const response = await axios.post(
        "/auth/refresh-token",
        {},
        { withCredentials: true }
      );
      set({ checkingAuth: false });
      return response.data;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      console.error(
        "Refresh token failed:",
        error.response?.data || error.message
      );
      return null; // Avoid throwing an error unless necessary
    }
  },
}));
