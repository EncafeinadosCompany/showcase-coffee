import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext1";
import { ProvidersPage } from "@/pages/providers/ProvidersPage";
import { VariantsPage } from "@/pages/variantsPage";
import { LoginPage } from "@/pages/LoginPage";
import { HomePage } from "@/pages/home/home";

import Shopping from "@/pages/shopping/shopping";
import Layout from "../layout/content/content";
import Sales from "@/pages/sales/sales";
import Liquidation from "@/pages/payments/liquidation";
import Page from "@/pages/products/products/components/page";
import CafePreview from "@/pages/store/store";
import Dashboard from "@/pages/dashboard/dashboard";
import Brands from "@/pages/products/brands/brands";
import Details from "@/pages/products/page";
import ProductosPage from "@/pages/products/products/products";
import NotFound from "@/pages/404/404";
import ProductForm from "@/pages/products/products/components/productsForm";
import FormBrand from "@/pages/products/brands/components/formBrands";

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
        <Route
          path="/page"
          element={
            <PrivateRoute>
              <Page />
            </PrivateRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/providers"
            element={
              <PrivateRoute>
                <ProvidersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/shopping"
            element={
              <PrivateRoute>
                <Shopping />
              </PrivateRoute>
            }
          />
          <Route
            path="/liquidations"
            element={
              <PrivateRoute>
                <Liquidation />
              </PrivateRoute>
            }
          />
          <Route
            path="/sales"
            element={
              <PrivateRoute>
                <Sales />
              </PrivateRoute>
            }
          />

          <Route
            path="/providers"
            element={
              <PrivateRoute>
                <ProvidersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/brands"
            element={
              <PrivateRoute>
                <Brands />
              </PrivateRoute>
            }
          />
          <Route
            path="/products-page"
            element={
              <PrivateRoute>
                <ProductosPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/form-brands"
            element={
              <PrivateRoute>
                <FormBrand/>
              </PrivateRoute>
            }
          />
          <Route
            path="/form-products"
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/details"
            element={
              <PrivateRoute>
                <Details />
              </PrivateRoute>
            }
          />
          <Route
            path="/variants"
            element={
              <PrivateRoute>
                <VariantsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <CafePreview />
              </PrivateRoute>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
