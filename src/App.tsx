import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/layouts/layout";
import { PrivateRoute } from "@/components/PrivateRoute";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import UserProfilePage from "@/pages/UserProfilePage";
import ProductsPage from "@/pages/ProductsPage";
import CartPage from "@/pages/CartPage";
import CategoryManagePage from "@/pages/CategoryManagePage";
import ProductManagePage from "@/pages/ProductManagePage";
import LoadingPanel from "@/components/LoadingPanel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout>Home page</Layout>} />
      <Route
        path="/login"
        element={
          <PrivateRoute type="guest">
            <Layout>
              <LoginPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PrivateRoute type="guest">
            <Layout>
              <RegisterPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/shop"
        element={
          <Layout>
            <ProductsPage></ProductsPage>
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout>
            <CartPage></CartPage>
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Layout>
              <UserProfilePage />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="category-management"
        element={
          <PrivateRoute type="admin">
            <Layout>
              <CategoryManagePage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="product-management"
        element={
          <PrivateRoute type="admin">
            <Layout>
              <ProductManagePage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="test"
        element={
          <Layout>
            <LoadingPanel />
          </Layout>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
