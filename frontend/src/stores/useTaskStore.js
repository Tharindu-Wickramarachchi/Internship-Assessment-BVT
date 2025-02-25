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

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,

  fetchTasks: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/task/get");
      set({ tasks: res.data.tasks, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to fetch tasks", {
        ...styles.errorStyle,
      });
    }
  },

  

  createTask: async (userId, task) => {
    if (!task.trim()) return; // Prevent empty tasks

    set({ loading: true });

    try {
      const res = await axios.post("/task/create", { user: userId, task });

      set((state) => ({
        tasks: [...state.tasks, res.data.task],
        loading: false,
      }));

      toast.success("Task created successfully!", styles.successStyle);
    } catch (error) {
      set({ loading: false });

      toast.error(
        error.response?.data?.message || "Error creating task",
        styles.errorStyle
      );
    }
  },

  updateTask: async (id, task) => {
    set({ loading: true });
    try {
      const res = await axios.put(`/task/update/${id}`, { task });
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === id ? res.data.task : t)),
        loading: false,
      }));
      toast.success("Task updated successfully!", { ...styles.successStyle });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Error updating task", {
        ...styles.errorStyle,
      });
    }
  },

  deleteTask: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`/task/delete/${id}`);
      set((state) => ({
        tasks: state.tasks.filter((t) => t._id !== id),
        loading: false,
      }));
      toast.success("Task deleted successfully!", { ...styles.successStyle });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Error deleting task", {
        ...styles.errorStyle,
      });
    }
  },

  deleteAllTasks: async () => {
    set({ loading: true });
    try {
      await axios.delete("/task/delete-all");
      set({ tasks: [], loading: false });
      toast.success("All tasks deleted successfully!", {
        ...styles.successStyle,
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Error deleting all tasks", {
        ...styles.errorStyle,
      });
    }
  },
}));

