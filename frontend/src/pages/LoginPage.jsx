import React, { useState } from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import { useUserStore } from "../stores/useUserStore.js";
import { User2, Loader } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 p-6 text-gray-100 bg-gray-800 border-2 border-gray-700 rounded-lg">
        <h2 className="text-center text-3xl font-bold text-gray-100">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <PasswordField
            label="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
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
                <User2 className="mr-2 h-5 w-5" aria-hidden="true" />
                Login
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm font-medium text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
