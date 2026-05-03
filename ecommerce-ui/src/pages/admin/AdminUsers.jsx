import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { Modal } from "../../components/common/Modal";
import { Input } from "../../components/common/Input";
import { Alert } from "../../components/common/Alert";
import { Spinner } from "../../components/common/Spinner";
import { C } from "../../styles/common";

export function AdminUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(""); const [err, setErr] = useState(""); const [search, setSearch] = useState("");
  const [editModal, setEditModal] = useState(null);
  const [editForm, setEditForm] = useState({ name:"", email:"", password:"" });

  useEffect(() => { api("/api/users","GET",null,token).then(setUsers).finally(() => setLoading(false)); }, []);

  const flash = (t, type="ok") => { type==="ok"?setMsg(t):setErr(t); setTimeout(()=>{setMsg("");setErr("");},3000); };

  const openEdit = u => { setEditForm({ name:u.name, email:u.email, password:"" }); setEditModal(u); };

  const saveEdit = async () => {
    const body = { name:editForm.name, email:editForm.email };
    if (editForm.password) body.password = editForm.password;
    try {
      const d = await api("/api/users/"+editModal.id,"PUT",body,token);
      setUsers(u => u.map(x => x.id===editModal.id ? {...x,...d} : x));
      flash("User updated!"); setEditModal(null);
    } catch (e) { flash(e.message,"err"); }
  };

  const del = async (id, name) => {
    if (!confirm("Delete user "+name+"?")) return;
    try {
      await api("/api/users/"+id,"DELETE",null,token);
      setUsers(u => u.filter(x => x.id!==id)); flash("User deleted!");
    } catch (e) { flash(e.message,"err"); }
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Spinner />;
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem", gap:12 }}>
        <span style={{ fontWeight:600, fontSize:14 }}>All users ({users.length})</span>
        <input style={{ ...C.input, width:220 }} placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <Alert text={msg} type="ok" /><Alert text={err} type="err" />
      <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
        {filtered.map(u => (
          <div key={u.id} style={{ ...C.card, padding:"0.9rem 1.25rem", display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:40, height:40, borderRadius:"50%", background:"#f0ede8", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:15, flexShrink:0 }}>
              {u.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontWeight:700, fontSize:13, margin:0 }}>{u.name}</p>
              <p style={{ fontSize:12, color:"#888", margin:"2px 0 0" }}>{u.email} · ID: {u.id}</p>
            </div>
            <span style={C.badge(u.role==="ROLE_ADMIN"?"blue":"gray")}>{u.role}</span>
            <div style={{ display:"flex", gap:6 }}>
              <button style={C.btnOutline} onClick={() => openEdit(u)}>Edit</button>
              {u.role !== "ROLE_ADMIN" && <button style={C.btnDanger} onClick={() => del(u.id,u.name)}>Delete</button>}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={C.empty}>No users found.</div>}
      </div>
      {editModal && (
        <Modal title={"Edit user - " + editModal.name} onClose={() => setEditModal(null)}>
          <Input label="Full name" value={editForm.name} onChange={e => setEditForm(f => ({...f,name:e.target.value}))} />
          <Input label="Email" type="email" value={editForm.email} onChange={e => setEditForm(f => ({...f,email:e.target.value}))} />
          <Input label="New password (leave blank)" type="password" placeholder="..." value={editForm.password} onChange={e => setEditForm(f => ({...f,password:e.target.value}))} />
          <div style={{ display:"flex", gap:8, marginTop:4 }}>
            <button style={{ ...C.btnPrimary, flex:1 }} onClick={saveEdit}>Save changes</button>
            <button style={{ ...C.btnOutline, flex:1 }} onClick={() => setEditModal(null)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
