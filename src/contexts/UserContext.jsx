import React, { createContext, useContext, useEffect, useState } from "react";
import * as api from "../api";

const UserCtx = createContext();

export function useUsers() {
  const ctx = useContext(UserCtx);
  if (!ctx) throw new Error("useUsers must be inside Provider");
  return ctx;
}

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    try {
      const [u, c] = await Promise.all([api.fetchUsers(), api.fetchCountries()]);
      setUsers(u);
      setCountries(c);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { reload(); }, []);

  const addUser = async (u) => {
    const created = await api.createUser(u);
    setUsers((prev) => [...prev, created]);
    return created;
  };

  const editUser = async (id, u) => {
    const updated = await api.updateUser(id, u);
    setUsers((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  };

  const removeUser = async (id) => {
    await api.deleteUser(id);
    setUsers((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <UserCtx.Provider value={{ users, countries, loading, reload, addUser, editUser, removeUser }}>
      {children}
    </UserCtx.Provider>
  );
}
