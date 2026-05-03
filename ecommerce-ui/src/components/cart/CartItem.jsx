import { C } from "../../styles/common";

export function CartItem({ item: c, onRemove }) {
  return (
    <div style={{ ...C.card, padding:"1rem 1.25rem", display:"flex", alignItems:"center", gap:14 }}>
      <div style={{ width:60, height:60, background:"#f5f4f2", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden" }}>
        {c.product?.imageUrl
          ? <img src={c.product.imageUrl} style={{ maxWidth:56, maxHeight:56, objectFit:"contain" }} onError={e => e.target.style.display="none"} />
          : <span style={{ fontSize:22 }}>📦</span>}
      </div>
      <div style={{ flex:1 }}>
        <p style={{ fontWeight:700, fontSize:14, margin:0 }}>{c.product?.name}</p>
        <p style={{ fontSize:12, color:"#888", margin:"2px 0 0" }}>Rs.{c.product?.price?.toLocaleString("en-IN")} each · Qty: {c.quantity}</p>
      </div>
      <div style={{ textAlign:"right" }}>
        <p style={{ fontWeight:700, fontSize:15, margin:"0 0 8px" }}>Rs.{(c.product?.price*c.quantity)?.toLocaleString("en-IN")}</p>
        <button style={C.btnDanger} onClick={() => onRemove(c.id)}>Remove</button>
      </div>
    </div>
  );
}
