import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { AuthProvider, useAuth } from "@/context/AuthContext1";
import { ProvidersPage } from "@/pages/ProviderPage";

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

        {/* Private Routes */}

        <Route element={<PrivateRoute><Layout /></PrivateRoute>}>

          <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/providers" element={<PrivateRoute><ProvidersPage /></PrivateRoute>} />

          {/* <Route path="productos" element={<Productos />} />
  <Route path="proveedores" element={<Proveedores />} /> */}

        </Route>

      </Routes>
    </AuthProvider>
  );
}
