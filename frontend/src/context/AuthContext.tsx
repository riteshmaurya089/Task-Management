import { createContext, useContext, useState, ReactNode } from "react";
import { login, signup } from "../api/authApi";

interface AuthContextType {
  user: any;
  loginUser: (email: string, password: string) => void;
  signupUser: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  const loginUser = async (email: string, password: string) => {
    const data = await login(email, password);
    
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", (data.userId));
    setUser(data.user);
  };

  const signupUser = async (name: string, email: string, password: string) => {
    const data = await signup(name, email, password);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", (data.userId));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, signupUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };
