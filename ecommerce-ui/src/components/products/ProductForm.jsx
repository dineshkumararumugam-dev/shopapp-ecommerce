import { Input } from "../common/Input";
import { C } from "../../styles/common";

export function ProductForm({ form, setForm, onSave, onCancel, isEdit }) {
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <>
      <Input label="Product name" placeholder="iPhone 15" value={form.name} onChange={set("name")} />
      <Input label="Description" type="textarea" placeholder="Short description..." value={form.description} onChange={set("description")} />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        <Input label="Price (Rs)" type="number" placeholder="0" value={form.price} onChange={set("price")} />
        <Input label="Stock" type="number" placeholder="0" value={form.stock} onChange={set("stock")} />
      </div>
      <Input label="Category" placeholder="Electronics" value={form.category} onChange={set("category")} />
      <Input label="Image URL" placeholder="https://..." value={form.imageUrl} onChange={set("imageUrl")} />
      <div style={{ display:"flex", gap:8, marginTop:4 }}>
        <button style={{ ...C.btnPrimary, flex:1 }} onClick={onSave}>{isEdit ? "Save changes" : "Add product"}</button>
        <button style={{ ...C.btnOutline, flex:1 }} onClick={onCancel}>Cancel</button>
      </div>
    </>
  );
}
