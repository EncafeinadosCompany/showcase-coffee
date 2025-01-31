import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { AuthProvider, useAuth } from "@/context/AuthContext1";
import { ProvidersPage } from "@/pages/ProviderPage";
import { Products } from "@/pages/products/products";
import Stores from "@/pages/store/StoreManagementPage";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

import Layout from '../layout/content/content';
import { HomePage } from "@/pages/home/home";

export function AppRouter() {
  return (
    <AuthProvider>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/providers" element={<PrivateRoute><ProvidersPage /></PrivateRoute>} />
        <Route path='/products' element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path='/stores' element={<PrivateRoute><Stores /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  );
}
