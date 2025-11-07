const API_BASE = import.meta.env.DEV ? "http://localhost:4000" : "/api";

export async function fetchCountries() {
  const res = await fetch(`${API_BASE}/countries`);
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
}

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function createUser(user) {
  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
}

export async function updateUser(id, user) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${API_BASE}/users/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete user");
}
