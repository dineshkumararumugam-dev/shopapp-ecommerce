import { C } from "../../styles/common";
export function Modal({ title, onClose, children }) {
  return (
    <div style={C.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={C.modalBox}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem" }}>
          <h2 style={{ ...C.h2, margin: 0 }}>{title}</h2>
          <button style={C.btnGhost} onClick={onClose}>x</button>
        </div>
        {children}
      </div>
    </div>
  );
}
