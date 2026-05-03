import { C } from "../../styles/common";

export const Inp = ({ label, type = "text", ...p }) => (
  <div style={{ marginBottom: 12 }}>
    {label && <label style={C.label}>{label}</label>}
    {type === "textarea"
      ? <textarea style={C.textarea} {...p} />
      : <input type={type} style={C.input} {...p}
          onFocus={e => e.target.style.borderColor = "#1c1c1c"}
          onBlur={e => e.target.style.borderColor = "#ddd"} />}
  </div>
);

export const Msg = ({ text, type }) =>
  text ? <div style={type === "ok" ? C.ok : C.err}>{text}</div> : null;

export const Spin = () => <div style={C.empty}>Loading...</div>;

export const Modal = ({ title, onClose, children }) => (
  <div style={C.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
    <div style={C.modalBox}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
        <h2 style={{ ...C.h2, margin: 0 }}>{title}</h2>
        <button style={C.btnGhost} onClick={onClose}>x</button>
      </div>
      {children}
    </div>
  </div>
);
