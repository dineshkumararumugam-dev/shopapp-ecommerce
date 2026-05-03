import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { api } from "./api/api";
import { Navbar } from "./components/common/Navbar";
import { AuthPage } from "./pages/AuthPage";
import { ProductsPage } from "./pages/ProductsPage";
import { CartPage } from "./pages/CartPage";
import { OrdersPage } from "./pages/OrdersPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminPage } from "./pages/admin/AdminPage";
import { C } from "./styles/common";

function AppContent() {
  const { token, user } = useAuth();
  const [page, setPage] = useState("products");
  const [cartCount, setCartCount] = useState(0);
  const isAdmin = user?.role === "ROLE_ADMIN";

  useEffect(() => {
    if (token) {
      api("/api/cart", "GET", null, token)
        .then(d => setCartCount(d.length))
        .catch(() => {});
    } else {
      setCartCount(0);
    }
  }, [token, page]);

  const renderPage = () => {
    if (!token && page !== "products") return <AuthPage />;
    switch (page) {
      case "products": return <ProductsPage />;
      case "cart":     return <CartPage goOrders={() => setPage("orders")} />;
      case "orders":   return <OrdersPage />;
      case "profile":  return <ProfilePage />;
      case "admin":    return isAdmin ? <AdminPage /> : <ProductsPage />;
      case "auth":     return <AuthPage />;
      default:         return <ProductsPage />;
    }
  };

  return (
    <div style={C.page}>
      <Navbar page={page} setPage={setPage} cartCount={cartCount} />
      <main style={C.main}>{renderPage()}</main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
