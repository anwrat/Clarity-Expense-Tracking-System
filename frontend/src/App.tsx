import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContent";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTransactionPage from "./pages/AddTransaction";
import UpdateTransactionPage from "./pages/UpdateTransaction";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
     return <LoadingSpinner />
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

          <Route 
            path="/add-transaction" 
            element={user ? <AddTransactionPage /> : <Navigate to="/login" />} 
          />

          <Route path="/edit-transaction/:id" element={user ? <UpdateTransactionPage /> : <Navigate to="/login" />} />

          {/* Global Redirects */}
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </main>
    </>
  );
}