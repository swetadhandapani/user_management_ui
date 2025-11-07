import React, { useState, useEffect, useRef } from "react";

export default function Layout({ children, onNavigate, activePage }) {
  const navItems = [
    { key: "landing", label: "Dashboard" },
    { key: "users", label: "Users" },
    { key: "profile", label: "Profile" }, // ✅ New Profile tab
    { key: "settings", label: "Settings" },
  ];

  // ---- Logged-in user ----
  const user = JSON.parse(localStorage.getItem("userInfo")) || { name: "Guest", email: "guest@example.com" };

  const [currentDateTime, setCurrentDateTime] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // ---- Update date/time ----
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      setCurrentDateTime(formatted.replace(",", " |"));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // ---- Close dropdown when clicking outside ----
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---- Logout handler ----
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col">
        <div className="p-6 text-xl font-semibold border-b border-gray-800">
          🧩 User Manager
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3 text-sm">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                activePage === item.key
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 text-gray-400 text-xs">
          © {new Date().getFullYear()} User Management
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow flex justify-between items-center px-6 py-3 relative">
          <h1 className="text-lg font-semibold text-gray-800">Users & Partners</h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700 font-medium">
              {currentDateTime} 
            </span>

            {/* Profile Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-1 border rounded-full hover:bg-gray-100 transition"
              >
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-xs">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-800 font-medium">{user.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`w-4 h-4 transition-transform ${
                    showMenu ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-50 animate-fadeIn">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
