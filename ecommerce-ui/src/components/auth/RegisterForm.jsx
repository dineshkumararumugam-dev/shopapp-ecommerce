import { useState } from "react";
import { api } from "../../api/api";
import { Input } from "../common/Input";
import { Alert } from "../common/Alert";
import { C } from "../../styles/common";

export function RegisterForm({ onSwitch }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState(""); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);

  const submit = async () => {
    setErr(""); setMsg(""); setBusy(true);
    try {
      await api("/api/auth/register", "POST", form);
      setMsg("Account created! You can now sign in.");
      setForm({ name: "", email: "", password: "" });
    } catch (e) { setErr(e.message); }
    finally { setBusy(false); }
  };

  return (
    <>
      <Input label="Full name" placeholder="Kumar Raja" value={form.name}
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      <Input label="Email" type="email" placeholder="you@example.com" value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
      <Input label="Password" type="password" placeholder="min 8 characters" value={form.password}
        onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
      <button style={{ ...C.btnPrimary, width:"100%", marginTop:4, opacity:busy?0.6:1 }}
        onClick={submit} disabled={busy}>{busy ? "Creating..." : "Create account"}</button>
      <Alert text={err} type="err" />
      <Alert text={msg} type="ok" />
      <p style={{ textAlign:"center", fontSize:13, color:"#888", marginTop:14 }}>
        Have an account? <span style={{ color:"#1c1c1c", fontWeight:600, cursor:"pointer" }} onClick={onSwitch}>Sign in</span>
      </p>
    </>
  );
}
