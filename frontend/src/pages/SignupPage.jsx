import React, { useState } from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import { useUserStore } from "../stores/useUserStore.js";
import { UserPlus, Loader } from "lucide-react";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useUserStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 p-6 text-gray-100 bg-gray-800 border-2 border-gray-700 rounded-lg">
        <h2 className="text-center text-3xl font-bold text-gray-100">Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Name"
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <InputField
            label="Email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <PasswordField
            label="Password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <PasswordField
            label="Confirm Password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />

          <button
            type="submit"
            className="w-full flex justify-center p-2 mt-5 border border-blue-400 rounded-md 
            text-md font-medium text-white bg-blue-600 hover:bg-blue-800 focus:outline-none
             transition duration-150 ease-in-out disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader
                  className="mr-2 h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                Signup
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
