const BASE = import.meta.env.VITE_API_URL || "http://localhost:8084";

export async function api(path, method = "GET", body = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const text = await res.text();

  // Try to parse as JSON
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!res.ok) {
    // Handle all possible error formats from Spring Boot
    let errorMsg = "Something went wrong";

    if (typeof data === "string" && data.trim() !== "") {
      // Plain string error — e.g. "Email already exists"
      errorMsg = data;

    } else if (typeof data === "object" && data !== null) {
      if (data.message) {
        // { message: "..." }
        errorMsg = data.message;
      } else if (data.error) {
        // { error: "Unauthorized", status: 401 }
        errorMsg = data.error;
      } else if (Object.keys(data).length > 0) {
        // Validation errors — { email: "Invalid email", name: "Required" }
        errorMsg = Object.values(data).join(", ");
      }
    }

    throw new Error(errorMsg);
  }

  return data;
}
