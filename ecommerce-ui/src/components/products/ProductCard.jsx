import { useState } from "react";
import { C } from "../../styles/common";

export function ProductCard({ product: p, token, onAddToCart }) {
  const [qty, setQty] = useState(1);
  return (
    <div style={{ ...C.cardSm, display:"flex", flexDirection:"column", gap:10 }}>
      <div style={{ height:160, background:"#f5f4f2", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
        {p.imageUrl
          ? <img src={p.imageUrl} alt={p.name} style={{ maxHeight:148, maxWidth:"100%", objectFit:"contain" }} onError={e => e.target.style.display="none"} />
          : <span style={{ fontSize:38 }}>📦</span>}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div style={{ flex:1, marginRight:8 }}>
          <p style={{ fontWeight:700, fontSize:14, margin:0 }}>{p.name}</p>
          <span style={C.tag}>{p.category}</span>
        </div>
        <span style={C.badge(p.stock>0?"green":"red")}>{p.stock>0 ? p.stock+" left" : "Out of stock"}</span>
      </div>
      {p.description && <p style={{ fontSize:12, color:"#888", margin:0, lineHeight:1.5 }}>{p.description}</p>}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"auto", paddingTop:4 }}>
        <span style={{ fontWeight:700, fontSize:17 }}>Rs.{p.price?.toLocaleString("en-IN")}</span>
        {token && p.stock > 0 && (
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <input type="number" min={1} max={p.stock} value={qty}
              onChange={e => setQty(Math.max(1, Math.min(p.stock, +e.target.value)))}
              style={{ ...C.input, width:50, padding:"5px 7px", textAlign:"center" }} />
            <button style={C.btnSm} onClick={() => onAddToCart(p, qty)}>Add</button>
          </div>
        )}
        {!token && p.stock>0 && <span style={{ fontSize:11, color:"#aaa" }}>Sign in to buy</span>}
      </div>
    </div>
  );
}
