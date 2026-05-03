import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { ProductCard } from "../components/products/ProductCard";
import { Alert } from "../components/common/Alert";
import { Spinner } from "../components/common/Spinner";
import { C } from "../styles/common";

export function ProductsPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [flash, setFlash] = useState({ text:"", type:"" });

  useEffect(() => { api("/api/products").then(setProducts).finally(() => setLoading(false)); }, []);

  const showFlash = (text, type="ok") => {
    setFlash({ text, type });
    setTimeout(() => setFlash({ text:"", type:"" }), 2500);
  };

  const addToCart = async (p, qty) => {
    try {
      await api("/api/cart", "POST", { productId: p.id, quantity: qty }, token);
      showFlash("Added " + p.name + " to cart!");
    } catch (e) { showFlash(e.message, "err"); }
  };

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Spinner />;
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem", flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={C.h1}>Products</h1>
          <p style={{ color:"#888", fontSize:13, margin:0 }}>{products.length} items available</p>
        </div>
        <input style={{ ...C.input, width:220 }} placeholder="Search by name or category..."
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <Alert text={flash.text} type={flash.type} />
      {filtered.length === 0 && <div style={C.empty}>No products found.</div>}
      <div style={{ ...C.grid3, marginTop:14 }}>
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} token={token} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
