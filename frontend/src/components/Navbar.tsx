import { useAuth } from "../context/AuthContent";
import { useNavigate, Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import mainlogo from '../assets/claritylogo.png';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left Side: Logo & Navigation */}
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="flex items-center transition-transform hover:scale-105">
              <img 
                src={mainlogo} 
                alt="Clarity Logo" 
                className="h-8 w-auto object-contain" // Limits height and maintains aspect ratio
              />
              <span className="ml-2 text-xl font-bold bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hidden xs:block">
                Clarity
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </div>
          </div>

          {/* Right Side: User Controls */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-3 pr-4 border-r border-gray-200 sm:flex">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 leading-none mb-1">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 leading-none">
                  {user?.email}
                </p>
              </div>
              {/* Simple Avatar Circle */}
              <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 uppercase">
                {user?.name?.charAt(0) || "U"}
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 shadow-sm shadow-red-200 transition-all active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}