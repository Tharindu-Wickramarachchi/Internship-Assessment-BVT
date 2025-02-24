import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Using Lucide React for icons

const PasswordField = ({ label, id, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-md font-medium text-gray-400">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          required
          value={value}
          onChange={onChange}
          className="block w-full text-md px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md
          placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
