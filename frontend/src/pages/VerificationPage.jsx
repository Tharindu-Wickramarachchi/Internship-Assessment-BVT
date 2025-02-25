import { useState, useRef, useEffect } from "react";
import { useUserStore } from "../stores/useUserStore";
import { Verified, BadgeX, Loader } from "lucide-react";

export default function TokenInput() {
  const [token, setToken] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  const { user, loading, verifyEmail, deleteAccount, resendVerificationEmail } =
    useUserStore();

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return; // Allow only single-digit numbers

    const newToken = [...token];
    newToken[index] = value;
    setToken(newToken);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !token[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (token.join("").length === 6) {
      verifyEmail(user.email, token.join(""));
    }
  };

  const handleCancel = () => {
    setToken(new Array(6).fill(""));
    inputsRef.current[0]?.focus();
    deleteAccount(user.email);
  };

  const resendEmail = () => {
    resendVerificationEmail(user.email);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 p-6 text-gray-100 bg-gray-800 border-2 border-gray-700 rounded-lg">
        <h2 className="text-center text-3xl font-bold text-gray-100">
          Email Verification
        </h2>
        <p className="text-center text-md font-normal text-gray-100">
          A verification code has been sent to{" "}
          <strong className="text-blue-500">{user.email}</strong>. It will
          expire in 15 minutes.
        </p>

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            {token.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 h-10 text-center border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            className="w-full flex justify-center p-2 mt-5 border border-blue-400 rounded-md 
            text-md font-medium text-white bg-blue-600 hover:bg-blue-800 focus:outline-none
            transition duration-150 ease-in-out disabled:opacity-50"
            disabled={loading || token.join("").length !== 6}
          >
            {loading ? (
              <>
                <Loader
                  className="mr-2 h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                Verifying...
              </>
            ) : (
              <>
                <Verified className="mr-2 h-5 w-5" aria-hidden="true" />
                Verify
              </>
            )}
          </button>

          <button
            onClick={handleCancel}
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
                Cancel...
              </>
            ) : (
              <>
                <BadgeX className="mr-2 h-5 w-5" aria-hidden="true" />
                Cancel
              </>
            )}
          </button>

          <p className="text-center text-sm font-medium text-gray-400">
            Didn't receive the email ?{" "}
            <span
              onClick={resendEmail}
              className="text-blue-500 pl-1 hover:underline"
            >
              Resend Email
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
