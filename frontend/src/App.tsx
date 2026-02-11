import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContent";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";

export default function App() {
  const { user, loading } = useAuth();

  // 1. Handle the "Initial Boot" state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600 font-medium">Loading Clarity...</span>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      
      {/* Navbar only shows when user is logged in */}
      {user && <Navbar />} 

      <main className={user ? "bg-gray-50 min-h-[calc(100vh-64px)]" : ""}>
        <Routes>
          {/* Public Routes: Redirect to Dashboard if already logged in */}
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage />} 
          />

          {/* Private Routes: Redirect to Login if not logged in */}
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/login" replace />} 
          />

          {/* Global Redirects */}
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </main>
    </>
  );
}