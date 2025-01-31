import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ProvidersPage } from "@/pages/ProviderPage";
import { Products } from "@/pages/products/products";
import { Liquidations } from "@/pages/payments/liquidation";

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
        <Route path='/products' element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path='/liquidation' element={<PrivateRoute><Liquidations /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  );
}
