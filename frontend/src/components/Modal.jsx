import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;