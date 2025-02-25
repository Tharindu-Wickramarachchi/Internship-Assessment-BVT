import React, { useState } from "react";
import {Edit, Trash2,Save} from "lucide-react";

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task.task);

  const handleUpdate = () => {
    onUpdate(task._id, updatedTask);
    setIsEditing(false);
  };

  return (
    <li className="flex justify-between items-center bg-gray-800 p-3 rounded shadow">
      {isEditing ? (
        <input
          type="text"
          value={updatedTask}
          onChange={(e) => setUpdatedTask(e.target.value)}
          className="flex-grow p-2  rounded text-white mr-2"
        />
      ) : (
        <span className="break-words max-w-[70%]">{task.task}</span>
      )}
      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-green-600 hover:bg-green-700 text-black p-2.5 rounded-full"
          >
            <Save size={18} />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-700 hover:bg-blue-800 text-black p-2.5 rounded-full"
          >
            <Edit size={18} />
          </button>
        )}
        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-700 hover:bg-red-800 text-black p-2.5 rounded-full"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;