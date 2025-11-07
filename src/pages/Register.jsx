import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Register({ onRegister, onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    const user = { name, email };
    localStorage.setItem("tempUser", JSON.stringify(user));
    onRegister(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password field with Lucide icons */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-black pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-black"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <button onClick={onSwitch} className="text-black hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
