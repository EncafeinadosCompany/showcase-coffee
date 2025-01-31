import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ProvidersPage } from "@/pages/ProviderPage";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/providers" />;
};

export function AppRouter() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/providers" element={<PrivateRoute><ProvidersPage /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  );
}
