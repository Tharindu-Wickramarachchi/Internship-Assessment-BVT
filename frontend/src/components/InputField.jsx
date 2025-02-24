const InputField = ({ label, id, type, value, onChange, placeholder }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-md font-medium text-gray-400">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={onChange}
        className="block w-full text-md px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md
          placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
