import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { OrderCard } from "../components/orders/OrderCard";
import { Spinner } from "../components/common/Spinner";
import { C } from "../styles/common";

export function OrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { api("/api/orders","GET",null,token).then(setOrders).finally(() => setLoading(false)); }, []);

  if (loading) return <Spinner />;
  return (
    <div>
      <h1 style={C.h1}>My Orders</h1>
      <p style={{ color:"#888", fontSize:13, marginBottom:"1.25rem" }}>{orders.length} order(s)</p>
      {orders.length === 0 && <div style={C.empty}>No orders yet. Place your first order from cart!</div>}
      <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
        {orders.slice().reverse().map(o => <OrderCard key={o.id} order={o} />)}
      </div>
    </div>
  );
}
