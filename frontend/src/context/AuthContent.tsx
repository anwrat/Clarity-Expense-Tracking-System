import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getMe,logOutUser } from "../api/api"; 

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await getMe();
        setUser(data.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = (userData: any) =>{
    setUser(userData);
    setLoading(false);
  } 
  const logout = async() => {
    try{
      setLoading(true);
      await logOutUser();
      setUser(null);
    }catch(err){
      console.error("Logout failed: ",err);
    }finally{
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};