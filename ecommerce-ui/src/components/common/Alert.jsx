import { C } from "../../styles/common";
export function Alert({ text, type }) {
  if (!text) return null;
  return <div style={type === "ok" ? C.ok : C.err}>{text}</div>;
}
