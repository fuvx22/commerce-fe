import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "@/AppRoutes.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "@/auth/authContext";
import { CartProvider } from "@/contexts/CartContext.tsx";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </Router>
);
