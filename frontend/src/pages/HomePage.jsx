import React, { useState, useEffect } from "react";
import { useTaskStore } from "../stores/useTaskStore";
import { useUserStore } from "../stores/useUserStore";
import Modal from "../components/Modal";
import TaskItem from "../components/TaskItem";


const MAX_LETTERS = 150; // Maximum character limit

const HomePage = () => {
  const {
    tasks,
    loading,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    deleteAllTasks,
  } = useTaskStore();
  const { user } = useUserStore();
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    const trimmedTask = newTask.trim();
    const charCount = trimmedTask.length;

    if (charCount > MAX_LETTERS) {
      setError(`Task exceeds maximum of ${MAX_LETTERS} characters`);
      return;
    }

    if (charCount === 0) {
      setError("Task cannot be empty");
      return;
    }

    await createTask(user._id, trimmedTask);
    setNewTask("");
    setError("");
  };

  const handleUpdateTask = async (taskId, updatedTask) => {
    const trimmedTask = updatedTask.trim();
    const charCount = trimmedTask.length;

    if (charCount > MAX_LETTERS) {
      alert(`Task exceeds maximum of ${MAX_LETTERS} characters`);
      return;
    }

    if (charCount > 0) {
      await updateTask(taskId, trimmedTask);
      setIsModalOpen(false);
    }
  };

  const charCount = newTask.trim().length;
  const isTaskValid = charCount > 0 && charCount <= MAX_LETTERS;

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-gray-900 text-gray-300 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">TODO APP</h1>

      {/* Task Input Section */}
      <div className="mb-5">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => {
              setNewTask(e.target.value);
              setError("");
            }}
            placeholder="Enter a task..."
            className="flex-grow p-2 border rounded text-gray-300"
          />
          <button
            onClick={handleCreateTask}
            disabled={!isTaskValid}
            className="bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 text-md font-medium rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>

        {/* Character Counter and Error Message */}
        <div className="mt-2 flex justify-between items-center px-1">
          <span className="text-sm text-gray-400">
            {charCount}/{MAX_LETTERS} characters
          </span>
          {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
      </div>

      {/* Task List */}
      {loading ? (
        <p className="text-center text-gray-300">Loading...</p>
      ) : (
        <ul className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-400">No tasks available.</p>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onUpdate={handleUpdateTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </ul>
      )}

      {/* Delete All Button */}
      {tasks.length > 0 && (
        <button
          onClick={deleteAllTasks}
          className="mt-5 w-full text-md font-medium bg-red-700 hover:bg-red-800 text-black p-2 rounded duration-200"
        >
          Delete All Tasks
        </button>
      )}

      {/* Modal for Editing Task */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <input
          type="text"
          value={selectedTask?.task || ""}
          onChange={(e) =>
            setSelectedTask({ ...selectedTask, task: e.target.value })
          }
          className="w-full p-2 border rounded text-gray-400"
        />
        <button
          onClick={() => handleUpdateTask(selectedTask._id, selectedTask.task)}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </Modal>
    </div>
  );
};

export default HomePage;