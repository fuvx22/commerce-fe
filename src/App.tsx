import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/layouts/layout";
import { PrivateRoute } from "@/components/PrivateRoute";
import LoadingPanel from "@/components/LoadingPanel";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import UserProfilePage from "@/pages/UserProfilePage";
import ProductsPage from "@/pages/ProductsPage";
import CartPage from "@/pages/CartPage";
import CategoryManagePage from "@/pages/CategoryManagePage";
import ProductManagePage from "@/pages/ProductManagePage";
import SubmitMailPage from "@/pages/SubmitMailPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import NotFoundPage from "@/pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout>Home page</Layout>} />
      <Route path="/404" element={<Layout>
        <NotFoundPage />
      </Layout>} />
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
        path="/submit-mail"
        element={
          <PrivateRoute type="guest">
            <Layout>
              <SubmitMailPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PrivateRoute type="guest">
            <Layout>
              <ResetPasswordPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/shop/:search?"
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

      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
