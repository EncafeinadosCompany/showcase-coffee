import { Routes, Route, Navigate } from "react-router-dom";
import  NotFound  from "@/pages/404/404";
import { AuthProvider, useAuth } from "@/context/AuthContext1";
// import { Liquidations } from "@/pages/payments/liquidation";
import { ProvidersPage } from "@/pages/providers/ProvidersPage";
import { Products } from "@/pages/products/products";
import { VariantsPage } from "@/pages/variantsPage";
import { LoginPage } from "@/pages/LoginPage";
import { HomePage } from "@/pages/home/home";
import Shopping from "@/pages/shopping/shopping";
import Layout from '../layout/content/content';
import Sales from "@/pages/sales/sales";
import Liquidation from "@/pages/payments/liquidation";
import Page from "@/pages/products/components/page";
import CafePreview from "@/pages/store/store";

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
        <Route path='/page' element={<PrivateRoute><Page/></PrivateRoute>} />
       
        <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/providers" element={<PrivateRoute><ProvidersPage /></PrivateRoute>} />
          <Route path="/shopping" element={<PrivateRoute><Shopping /></PrivateRoute>} />
          <Route path="/liquidations" element={<PrivateRoute><Liquidation/></PrivateRoute>} />
          <Route path="/sales" element={<PrivateRoute><Sales/></PrivateRoute>} />

          <Route path="/providers" element={<PrivateRoute><ProvidersPage /></PrivateRoute>} />
          <Route path='/products' element={<PrivateRoute><Products /></PrivateRoute>} />       
          <Route path='/variants' element={<PrivateRoute><VariantsPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><CafePreview/></PrivateRoute>} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
