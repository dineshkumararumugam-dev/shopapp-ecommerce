import { useState } from "react";
import { C } from "../../styles/common";

export function OrderCard({ order: o }) {
  const [open, setOpen] = useState(false);
  const statusColor = s => s==="PENDING"?"amber":s==="DELIVERED"?"green":s==="CANCELLED"?"red":"blue";
  return (
    <div style={C.card}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer" }} onClick={() => setOpen(v => !v)}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
            <span style={{ fontWeight:700, fontSize:14 }}>Order #{o.id}</span>
            <span style={C.badge(statusColor(o.status))}>{o.status}</span>
          </div>
          <p style={{ fontSize:12, color:"#888", margin:0 }}>
            {o.orderDate ? new Date(o.orderDate).toLocaleString("en-IN",{ day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit" }) : "-"}
            {" · "}{o.orderItems?.length||0} item(s)
          </p>
        </div>
        <div style={{ textAlign:"right" }}>
          <p style={{ fontWeight:700, fontSize:18, margin:"0 0 4px" }}>Rs.{o.totalAmount?.toLocaleString("en-IN")}</p>
          <span style={{ fontSize:12, color:"#aaa" }}>{open ? "Hide details" : "View details"}</span>
        </div>
      </div>
      {open && (
        <>
          <div style={C.divider} />
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {o.orderItems?.map(item => (
              <div key={item.id} style={{ display:"flex", alignItems:"center", gap:12, fontSize:13 }}>
                <div style={{ width:40, height:40, background:"#f5f4f2", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {item.product?.imageUrl ? <img src={item.product.imageUrl} style={{ maxWidth:36, maxHeight:36, objectFit:"contain" }} /> : <span>📦</span>}
                </div>
                <span style={{ flex:1, color:"#444" }}>{item.product?.name}</span>
                <span style={{ color:"#888" }}>x{item.quantity}</span>
                <span style={{ fontWeight:600 }}>Rs.{(item.price*item.quantity)?.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
