import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { Modal } from "../../components/common/Modal";
import { ProductForm } from "../../components/products/ProductForm";
import { Alert } from "../../components/common/Alert";
import { Spinner } from "../../components/common/Spinner";
import { C } from "../../styles/common";

const EMPTY = { name:"", description:"", price:"", category:"", stock:"", imageUrl:"" };

export function AdminProducts() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState(""); const [err, setErr] = useState(""); const [search, setSearch] = useState("");

  useEffect(() => { api("/api/products").then(setProducts).finally(() => setLoading(false)); }, []);

  const flash = (t, type="ok") => { type==="ok" ? setMsg(t) : setErr(t); setTimeout(() => { setMsg(""); setErr(""); }, 3000); };

  const openEdit = p => { setForm({ name:p.name, description:p.description||"", price:p.price, category:p.category||"", stock:p.stock, imageUrl:p.imageUrl||"" }); setModal(p.id); };

  const save = async () => {
    const body = { ...form, price:parseFloat(form.price)||0, stock:parseInt(form.stock)||0 };
    try {
      if (modal === "add") {
        const d = await api("/api/products/add","POST",body,token);
        setProducts(p => [...p, d]); flash("Product added!");
      } else {
        const d = await api("/api/products/update/"+modal,"PUT",body,token);
        setProducts(p => p.map(x => x.id===modal ? d : x)); flash("Product updated!");
      }
      setModal(null);
    } catch (e) { flash(e.message,"err"); }
  };

  const del = async (id, name) => {
    if (!confirm("Delete "+name+"?")) return;
    try {
      await api("/api/products/delete/"+id,"DELETE",null,token);
      setProducts(p => p.filter(x => x.id!==id)); flash("Deleted!");
    } catch (e) { flash(e.message,"err"); }
  };

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Spinner />;
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem", gap:12, flexWrap:"wrap" }}>
        <span style={{ fontWeight:600, fontSize:14 }}>All products ({products.length})</span>
        <div style={{ display:"flex", gap:8 }}>
          <input style={{ ...C.input, width:200 }} placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
          <button style={C.btnPrimary} onClick={() => { setForm(EMPTY); setModal("add"); }}>+ Add product</button>
        </div>
      </div>
      <Alert text={msg} type="ok" /><Alert text={err} type="err" />
      <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
        {filtered.map(p => (
          <div key={p.id} style={{ ...C.card, padding:"0.9rem 1.25rem", display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:50, height:50, background:"#f5f4f2", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden" }}>
              {p.imageUrl ? <img src={p.imageUrl} style={{ maxWidth:46, maxHeight:46, objectFit:"contain" }} onError={e => e.target.style.display="none"} /> : <span style={{ fontSize:20 }}>📦</span>}
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontWeight:700, fontSize:13, margin:0 }}>{p.name}</p>
              <p style={{ fontSize:12, color:"#888", margin:"2px 0 0" }}>Rs.{p.price?.toLocaleString("en-IN")} · <span style={C.tag}>{p.category}</span></p>
            </div>
            <span style={C.badge(p.stock>10?"green":p.stock>0?"amber":"red")}>Stock: {p.stock}</span>
            <div style={{ display:"flex", gap:6 }}>
              <button style={C.btnOutline} onClick={() => openEdit(p)}>Edit</button>
              <button style={C.btnDanger} onClick={() => del(p.id,p.name)}>Delete</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={C.empty}>No products found.</div>}
      </div>
      {modal && (
        <Modal title={modal==="add" ? "Add product" : "Edit product"} onClose={() => setModal(null)}>
          <ProductForm form={form} setForm={setForm} onSave={save} onCancel={() => setModal(null)} isEdit={modal!=="add"} />
        </Modal>
      )}
    </div>
  );
}
