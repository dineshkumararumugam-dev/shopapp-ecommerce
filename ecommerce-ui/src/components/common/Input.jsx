import { C } from "../../styles/common";
export function Input({ label, type = "text", ...p }) {
  return (
    <div style={{ marginBottom: 12 }}>
      {label && <label style={C.label}>{label}</label>}
      {type === "textarea"
        ? <textarea style={C.textarea} {...p} />
        : <input type={type} style={C.input} {...p}
            onFocus={e => e.target.style.borderColor = "#1c1c1c"}
            onBlur={e => e.target.style.borderColor = "#ddd"} />}
    </div>
  );
}
