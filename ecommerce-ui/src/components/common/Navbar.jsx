import { useAuth } from "../../context/AuthContext";
import { C } from "../../styles/common";

export function Navbar({ page, setPage, cartCount }) {
  const { token, user, logout } = useAuth();
  const isAdmin = user?.role === "ROLE_ADMIN";

  const navItems = [
    { id: "products", label: "Products" },
    ...(token ? [
      { id: "cart", label: cartCount > 0 ? "Cart (" + cartCount + ")" : "Cart" },
      { id: "orders", label: "Orders" },
      { id: "profile", label: "Profile" },
      ...(isAdmin ? [{ id: "admin", label: "Admin" }] : []),
    ] : []),
  ];

  return (
    <nav style={C.nav}>
      <span style={C.brand} onClick={() => setPage("products")}>ShopApp</span>
      <div style={{ display:"flex", gap:4, alignItems:"center" }}>
        {navItems.map(n => (
          <button key={n.id} style={C.navLink(page === n.id)} onClick={() => setPage(n.id)}>{n.label}</button>
        ))}
        {token
          ? <div style={{ display:"flex", alignItems:"center", gap:8, marginLeft:8 }}>
              {isAdmin && <span style={C.badge("blue")}>Admin</span>}
              <button style={C.btnPrimary} onClick={() => { logout(); setPage("products"); }}>Sign out</button>
            </div>
          : <button style={{ ...C.btnPrimary, marginLeft:8 }} onClick={() => setPage("auth")}>Sign in</button>}
      </div>
    </nav>
  );
}
