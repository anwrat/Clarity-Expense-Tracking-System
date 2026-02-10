import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContent";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { user, loading } = useAuth();
    console.log("App State -> Loading:", loading, "User:", user);
  if (loading) return <div>Loading Clarity...</div>;

  return (
    <>
        <Toaster position="top-center" reverseOrder={false}/>
        <Routes>
        {/* If logged in, redirect away from login/register to dashboard */}
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />} />
        
        {/* If NOT logged in, redirect away from dashboard to login */}
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        
        {/* Default route */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
    </>
  );
}