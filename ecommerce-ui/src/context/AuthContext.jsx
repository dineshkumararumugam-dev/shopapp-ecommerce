import { createContext, useContext, useState } from "react";
import { parseJwt } from "../utils/jwt";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem("token");
    if (!t) return null;
    const p = parseJwt(t);
    return p ? { email: p.sub, role: p.role, id: p.id || null } : null;
  });

  const login = (t) => {
    localStorage.setItem("token", t);
    setToken(t);
    const p = parseJwt(t);
    setUser({ email: p?.sub, role: p?.role, id: p?.id || null });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
