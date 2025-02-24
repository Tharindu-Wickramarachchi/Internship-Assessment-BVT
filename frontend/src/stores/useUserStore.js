import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-toastify";

const styles = {
  loadingStyle: {
    className: "bg-sky-100 text-black",
    position: "top-center",
  },
  errorStyle: {
    className: "bg-red-100 text-black",
    position: "top-center",
    autoClose: 3000,
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
        className: "bg-green-100 text-black",
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "An error occurred", {
        ...styles.errorStyle,
      });
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });

      set({ user: res.data, loading: false });

      toast.success("Login successful!", {
        className: "bg-green-100 text-black",
        position: "top-center",
        autoClose: 3000,
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
        className: "bg-green-100 text-black",
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Logout failed, please try again.", {
        ...styles.errorStyle,
      });
    }
  },

  verifyEmail: async ({ email, verificationToken }) => {
    set({ loading: true });

    try {
      await axios.post("/auth/verify-email", { email, verificationToken });

      set((state) => ({ user: { ...state.user, isVerified: true }, loading: false }));

      toast.success("Email verified successfully!", {
        className: "bg-green-100 text-black",
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Verification failed", {
        ...styles.errorStyle,
      });
    }
  },

  resendVerificationEmail: async ({ email }) => {
    set({ loading: true });

    try {
      await axios.post("/auth/resend-verification", { email });

      set({ loading: false });

      toast.success("Verification email sent successfully!", {
        className: "bg-green-100 text-black",
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Error sending email", {
        ...styles.errorStyle,
      });
    }
  },

  deleteAccount: async ({ email }) => {
    set({ loading: true });

    try {
      await axios.post("/auth/delete-account", { email });

      set({ user: null, loading: false });

      toast.success("Account deleted successfully.", {
        className: "bg-green-100 text-black",
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Error deleting account", {
        ...styles.errorStyle,
      });
    }
  },
}));
