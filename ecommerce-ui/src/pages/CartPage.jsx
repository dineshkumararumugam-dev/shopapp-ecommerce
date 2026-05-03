import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { CartItem } from "../components/cart/CartItem";
import { Alert } from "../components/common/Alert";
import { Spinner } from "../components/common/Spinner";
import { C } from "../styles/common";

export function CartPage({ goOrders }) {
  const { token } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(""); const [err, setErr] = useState(""); const [placing, setPlacing] = useState(false);

  useEffect(() => { api("/api/cart","GET",null,token).then(setCart).finally(() => setLoading(false)); }, []);

  const remove = async (id) => {
    try { await api("/api/cart/"+id,"DELETE",null,token); setCart(c => c.filter(x => x.id !== id)); }
    catch (e) { setErr(e.message); }
  };

  const placeOrder = async () => {
    if (!cart.length) return;
    setErr(""); setPlacing(true);
    try {
      await api("/api/orders","POST",{ cartIds: cart.map(c => c.id) },token);
      setMsg("Order placed successfully!");
      setCart([]);
      setTimeout(() => { setMsg(""); goOrders(); }, 2000);
    } catch (e) { setErr(e.message); }
    finally { setPlacing(false); }
  };

  const total = cart.reduce((s,c) => s + (c.product?.price * c.quantity || 0), 0);

  if (loading) return <Spinner />;
  return (
    <div>
      <h1 style={C.h1}>My Cart</h1>
      <p style={{ color:"#888", fontSize:13, marginBottom:"1.25rem" }}>{cart.length} item(s)</p>
      <Alert text={msg} type="ok" /><Alert text={err} type="err" />
      {cart.length === 0 && <div style={C.empty}>Your cart is empty. Browse products and add items!</div>}
      <div style={{ display:"flex", gap:"1.5rem", alignItems:"flex-start", flexWrap:"wrap" }}>
        <div style={{ flex:2, minWidth:280, display:"flex", flexDirection:"column", gap:"0.75rem" }}>
          {cart.map(c => <CartItem key={c.id} item={c} onRemove={remove} />)}
        </div>
        {cart.length > 0 && (
          <div style={{ flex:1, minWidth:220 }}>
            <div style={C.card}>
              <h2 style={{ ...C.h2, marginBottom:"0.75rem" }}>Order summary</h2>
              <div style={C.divider} />
              {cart.map(c => (
                <div key={c.id} style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:6 }}>
                  <span style={{ color:"#666" }}>{c.product?.name} x{c.quantity}</span>
                  <span>Rs.{(c.product?.price*c.quantity)?.toLocaleString("en-IN")}</span>
                </div>
              ))}
              <div style={C.divider} />
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
                <span style={{ fontWeight:700, fontSize:14 }}>Total</span>
                <span style={{ fontWeight:700, fontSize:20 }}>Rs.{total.toLocaleString("en-IN")}</span>
              </div>
              <button style={{ ...C.btnPrimary, width:"100%", opacity:placing?0.6:1 }} onClick={placeOrder} disabled={placing}>
                {placing ? "Placing order..." : "Place order"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
