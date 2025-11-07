import React, { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";
import ListPage from "./pages/ListPage";
import Modal from "./components/Modal";
import UserForm from "./components/UserForm";
import { useUsers } from "./contexts/UserContext";
import { useToast, ToastContainer } from "./components/Toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

export default function App() {
  const { users, countries, addUser, editUser, loading } = useUsers();
  const { messages, once } = useToast();

  // ---------- Auth State ----------
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) setUser(storedUser);
  }, []);

  // ---------- App Page State ----------
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);
  const [current, setCurrent] = useState(null);
  const [activePage, setActivePage] = useState("landing");

  const handleNavigate = (page) => setActivePage(page);

  // ---------- CRUD Handlers ----------
  const handleCreate = async (data) => {
    try {
      await addUser(data);
      once("User created ✅");
      setShowAdd(false);
      setActivePage("users");
    } catch (e) {
      once(e.message, "error");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await editUser(current.id, data);
      once("User updated ✅");
      setShowEdit(false);
      setShowView(false);
    } catch (e) {
      once(e.message, "error");
    }
  };

  // ---------- Auth Handlers ----------
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setShowRegister(false);
  };

  const handleRegister = (newUser) => {
    // ✅ Save new user temporarily or to localStorage if needed
    localStorage.setItem("tempUser", JSON.stringify(newUser));

    // ✅ Switch to login page after registration
    once("Registration successful! Please login ✅");
    setShowRegister(false);
  };

  // ---------- Render Based on Auth ----------
  if (!user) {
    return showRegister ? (
      <Register
        onRegister={handleRegister}
        onSwitch={() => setShowRegister(false)}
      />
    ) : (
      <Login onLogin={handleLogin} onSwitch={() => setShowRegister(true)} />
    );
  }

  // ---------- Page Rendering ----------
  let content;
  if (activePage === "landing") {
    content = (
      <Landing
        onNew={() => {
          setActivePage("users");
          setShowAdd(true);
        }}
      />
    );
  } else if (activePage === "users") {
    content = (
      <ListPage
        onNew={() => setShowAdd(true)}
        onView={(u) => {
          setCurrent(u);
          setShowView(true);
        }}
        onEdit={(u) => {
          setCurrent(u);
          setShowEdit(true);
        }}
        onBack={() => setActivePage("landing")}
      />
    );
  } else if (activePage === "profile") {
    content = <Profile />;
  } else {
    content = (
      <div className="p-10 text-gray-500 text-center">
        ⚙️ Settings coming soon...
      </div>
    );
  }

  // ---------- Main App Layout ----------
  return (
    <Layout onNavigate={handleNavigate} activePage={activePage}>
      {content}

      {/* ---------- Modals ---------- */}
      <Modal title="New User" open={showAdd} onClose={() => setShowAdd(false)}>
        <UserForm
          countries={countries}
          onCancel={() => setShowAdd(false)}
          onSave={handleCreate}
        />
      </Modal>

      <Modal
        title="Edit User"
        open={showEdit}
        onClose={() => setShowEdit(false)}
      >
        <UserForm
          initial={current}
          countries={countries}
          onCancel={() => setShowEdit(false)}
          onSave={handleUpdate}
        />
      </Modal>

      <Modal
        title="View Details"
        open={showView}
        onClose={() => setShowView(false)}
      >
        <div>
          <div className="mb-2">
            <strong>User Name:</strong> {current?.name}
          </div>
          <div className="mb-2">
            <strong>User Code:</strong> {current?.code ?? "-"}
          </div>
          <div className="mb-2">
            <strong>Countries:</strong>
            <div className="mt-2 flex flex-wrap">
              {(current?.countries ?? []).map((c) => (
                <div
                  key={c}
                  className="px-2 py-1 mr-2 bg-gray-200 rounded text-xs"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setShowView(false)}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowView(false);
                setShowEdit(true);
              }}
              className="px-3 py-1 bg-black text-white rounded"
            >
              Edit
            </button>
          </div>
        </div>
      </Modal>

      <ToastContainer messages={messages} />
    </Layout>
  );
}
