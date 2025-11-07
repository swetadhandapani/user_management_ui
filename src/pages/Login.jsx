import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    const registeredUser = JSON.parse(localStorage.getItem("tempUser"));

    if (registeredUser && registeredUser.email === email) {
      localStorage.setItem("userInfo", JSON.stringify(registeredUser));
      onLogin(registeredUser);
    } else {
      const user = { name: email.split("@")[0], email };
      localStorage.setItem("userInfo", JSON.stringify(user));
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Don’t have an account?{" "}
          <button onClick={onSwitch} className="text-black hover:underline">
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
