import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/common/Input";
import { Alert } from "../components/common/Alert";
import { Modal } from "../components/common/Modal";
import { Spinner } from "../components/common/Spinner";
import { C } from "../styles/common";

export function ProfilePage() {
  const { token, user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(""); const [err, setErr] = useState("");
  const [delModal, setDelModal] = useState(false);

  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }
    api("/api/users/"+user.id,"GET",null,token)
      .then(d => { setProfile(d); setForm({ name:d.name, email:d.email, password:"" }); })
      .catch(() => setProfile({ name:user.email, email:user.email, role:user.role }))
      .finally(() => setLoading(false));
  }, []);

  const update = async () => {
    setErr(""); setMsg("");
    const body = { name:form.name, email:form.email };
    if (form.password) body.password = form.password;
    try {
      const d = await api("/api/users/"+user.id,"PUT",body,token);
      setProfile(d); setMsg("Profile updated!"); setForm(f => ({...f, password:""}));
    } catch (e) { setErr(e.message); }
  };

  const deleteAccount = async () => {
    try { await api("/api/users/"+user.id,"DELETE",null,token); logout(); }
    catch (e) { setErr(e.message); setDelModal(false); }
  };

  if (loading) return <Spinner />;
  return (
    <div style={{ maxWidth:520 }}>
      <h1 style={C.h1}>My Profile</h1>
      <p style={{ color:"#888", fontSize:13, marginBottom:"1.5rem" }}>Manage your account details</p>
      <div style={C.card}>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:"1.5rem" }}>
          <div style={{ width:56, height:56, borderRadius:"50%", background:"#f0ede8", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:22 }}>
            {(profile?.name||user?.email)?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={{ fontWeight:700, fontSize:16, margin:0 }}>{profile?.name}</p>
            <p style={{ fontSize:13, color:"#888", margin:"2px 0 4px" }}>{profile?.email}</p>
            <span style={C.badge(profile?.role==="ROLE_ADMIN"?"blue":"gray")}>{profile?.role}</span>
          </div>
        </div>
        <div style={C.divider} />
        <h2 style={{ ...C.h2, marginTop:"1rem" }}>Update details</h2>
        <Input label="Full name" value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} />
        <Input label="Email" type="email" value={form.email} onChange={e => setForm(f => ({...f, email:e.target.value}))} />
        <Input label="New password (leave blank to keep)" type="password" placeholder="..." value={form.password} onChange={e => setForm(f => ({...f, password:e.target.value}))} />
        <button style={{ ...C.btnPrimary, width:"100%", marginTop:4 }} onClick={update}>Save changes</button>
        <Alert text={msg} type="ok" /><Alert text={err} type="err" />
        <div style={C.divider} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:13, color:"#888" }}>Danger zone</span>
          <button style={C.btnDanger} onClick={() => setDelModal(true)}>Delete account</button>
        </div>
      </div>
      {delModal && (
        <Modal title="Delete account?" onClose={() => setDelModal(false)}>
          <p style={{ fontSize:13, color:"#666", marginBottom:"1.5rem" }}>This is permanent. All your data will be deleted.</p>
          <div style={{ display:"flex", gap:8 }}>
            <button style={{ ...C.btnDanger, flex:1, padding:"10px" }} onClick={deleteAccount}>Yes, delete</button>
            <button style={{ ...C.btnOutline, flex:1, padding:"10px" }} onClick={() => setDelModal(false)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
