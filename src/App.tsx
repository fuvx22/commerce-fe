import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/layouts/layout";
import UserProfile from "@/pages/UserProfile";
import { PrivateRoute } from "@/components/PrivateRoute";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout>Home page</Layout>} />
      <Route path="/login" element={<Layout><LoginPage /></Layout>} />
      <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
      <Route path="/shop" element={<Layout>Shop page</Layout>} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Layout>
              <UserProfile />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
