import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage"; // Ensure correct import
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
