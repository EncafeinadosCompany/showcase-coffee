import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser, logoutUser } from "../features/auth/authSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { RootState } from "@/store/store";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated); 

  const login = async (email: string, password: string) => {
    try {
      const response = await dispatch(loginUser({ email, password })).unwrap();
      
      if (response.success) {
        navigate("/home");
      } else {
        console.error("Error en el login: ", response.message);
      }
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };  

  const logout = () => {
    localStorage.removeItem("token");

    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
