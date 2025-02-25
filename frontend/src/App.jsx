import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import VerificationPage from "./pages/VerificationPage";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/verification" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/verification" />}
        />
        <Route
          path="/verification"
          element={
            user && !user.isVerified ? (
              <VerificationPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
