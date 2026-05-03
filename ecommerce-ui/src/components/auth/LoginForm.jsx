import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/api";
import { Input } from "../common/Input";
import { Alert } from "../common/Alert";
import { C } from "../../styles/common";

export function LoginForm({ onSwitch }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setErr(""); setBusy(true);
    try {
      const d = await api("/api/auth/login", "POST", form);
      login(d.token);
    } catch (e) { setErr(e.message); }
    finally { setBusy(false); }
  };

  return (
    <>
      <Input label="Email" type="email" placeholder="you@example.com" value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
      <Input label="Password" type="password" placeholder="..." value={form.password}
        onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
      <button style={{ ...C.btnPrimary, width: "100%", marginTop: 4, opacity: busy ? 0.6 : 1 }}
        onClick={submit} disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
      <Alert text={err} type="err" />
      <p style={{ textAlign:"center", fontSize:13, color:"#888", marginTop:14 }}>
        No account? <span style={{ color:"#1c1c1c", fontWeight:600, cursor:"pointer" }} onClick={onSwitch}>Register</span>
      </p>
    </>
  );
}
