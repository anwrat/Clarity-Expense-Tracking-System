import { useState } from "react";
import { loginUser } from "../api/api";
import { useAuth } from "../context/AuthContent";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser(email, password);
      if (data.success) {
        login(data.data); // Save user to global state
        console.log("Login data: ",data.user);
        toast.success('Welcome back!');
        navigate("/dashboard"); // Redirect
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong. Please try again later.");
    }
    finally{
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-10 bg-white rounded-lg shadow-md w-96">
        <h1 className="mb-6 text-2xl font-bold text-center">Clarity Login</h1>
        
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-6 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button 
          type="submit"
          className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          {loading?"Logging In..": "Log In"}
        </button>
      </form>
    </div>
  );
}