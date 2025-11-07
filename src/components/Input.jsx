import React from "react";

export default function Input({ label, value, onChange, placeholder, error }) {
  return (
    <div className="mb-3">
      {label && <label className="block text-sm mb-1">{label}</label>}
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
      />
      {error && <div className="text-sm text-red-600 mt-1">{error}</div>}
    </div>
  );
}
