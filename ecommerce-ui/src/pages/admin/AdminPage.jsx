import { useState } from "react";
import { AdminProducts } from "./AdminProducts";
import { AdminUsers } from "./AdminUsers";
import { C } from "../../styles/common";

const tabs = [{ id:"products", label:"Products" }, { id:"users", label:"Users" }];

export function AdminPage() {
  const [tab, setTab] = useState("products");
  return (
    <div>
      <h1 style={C.h1}>Admin panel</h1>
      <p style={{ color:"#888", fontSize:13, marginBottom:"1.5rem" }}>Manage your store</p>
      <div style={{ display:"flex", gap:4, marginBottom:"1.5rem", borderBottom:"1px solid #eae8e4" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ ...C.navLink(tab===t.id), borderRadius:"6px 6px 0 0",
              borderBottom:tab===t.id?"2px solid #1c1c1c":"2px solid transparent", paddingBottom:10 }}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === "products" && <AdminProducts />}
      {tab === "users"    && <AdminUsers />}
    </div>
  );
}
