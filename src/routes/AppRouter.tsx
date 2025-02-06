import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "@/context/AuthContext1";
import { Liquidations } from "@/pages/payments/liquidation";
import { ProvidersPage } from "@/pages/ProviderPage";
import { Products } from "@/pages/products/products";
import { VariantsPage } from "@/pages/variantsPage";
import { LoginPage } from "@/pages/LoginPage";
import { HomePage } from "@/pages/home/home";

import Stores from "@/pages/store/StoreManagementPage";
import Shopping from "@/pages/shopping/shopping";
import Layout from '../layout/content/content';
import Sales from "@/pages/sales/sales";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

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
          <Route path="/liquidations" element={<PrivateRoute><Liquidations /></PrivateRoute>} />
          <Route path="/shopping" element={<PrivateRoute><Shopping /></PrivateRoute>} />
          <Route path="/sales" element={<PrivateRoute><Sales/></PrivateRoute>} />

          <Route path="/providers" element={<PrivateRoute><ProvidersPage /></PrivateRoute>} />
          <Route path='/products' element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path='/stores' element={<PrivateRoute><Stores /></PrivateRoute>} />
          <Route path='/variants' element={<PrivateRoute><VariantsPage /></PrivateRoute>} />
        </Route>
        

      </Routes>
    </AuthProvider>
  );
}
