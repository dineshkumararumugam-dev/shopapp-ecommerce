import { useState } from "react";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisterForm";
import { C } from "../styles/common";

export function AuthPage() {
  const [tab, setTab] = useState("login");
  return (
    <div style={{ ...C.page, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ width:360 }}>
        <h1 style={{ ...C.h1, textAlign:"center", marginBottom:4 }}>
          {tab === "login" ? "Welcome back" : "Create account"}
        </h1>
        <p style={{ textAlign:"center", color:"#888", fontSize:13, marginBottom:24 }}>
          {tab === "login" ? "Sign in to your account" : "Join ShopApp today"}
        </p>
        <div style={{ ...C.card, marginBottom:12 }}>
          <div style={{ display:"flex", gap:4, marginBottom:20, background:"#f3f2f0", borderRadius:8, padding:4 }}>
            {["login","register"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ flex:1, border:"none", borderRadius:6, padding:"7px", fontSize:13,
                  fontWeight:tab===t?600:400, background:tab===t?"#fff":"transparent",
                  color:tab===t?"#1c1c1c":"#888", cursor:"pointer" }}>
                {t === "login" ? "Sign in" : "Register"}
              </button>
            ))}
          </div>
          {tab === "login"
            ? <LoginForm onSwitch={() => setTab("register")} />
            : <RegisterForm onSwitch={() => setTab("login")} />}
        </div>
      </div>
    </div>
  );
}
