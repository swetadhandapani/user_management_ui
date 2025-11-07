import React, { useState, useRef, useEffect } from "react";

export default function MultiSelect({ options = [], value, onChange, placeholder, error }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef();

  const toggle = (code) => {
    let newValue;
    if (value.includes(code)) {
      newValue = value.filter((c) => c !== code);
    } else {
      newValue = [...value, code];
    }
    onChange(newValue);
    setOpen(false); // ✅ close after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-3 relative" ref={containerRef}>
      <label className="block text-sm mb-1 font-medium">Assign Countries</label>
      <div
        className="border rounded p-2 cursor-pointer bg-white flex flex-wrap gap-1 min-h-[42px]"
        onClick={() => setOpen((prev) => !prev)}
      >
        {value.length === 0 ? (
          <span className="text-sm text-gray-500">{placeholder ?? "Select countries"}</span>
        ) : (
          value.map((code) => {
            const country = options.find((c) => c.code === code);
            return (
              <span
                key={code}
                className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md"
              >
                {country ? `${country.name} (${country.code})` : code}
              </span>
            );
          })
        )}
      </div>

      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-auto">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500">No countries found</div>
          ) : (
            options.map((opt) => (
              <div
                key={opt.code}
                onClick={() => toggle(opt.code)}
                className={`px-3 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center ${
                  value.includes(opt.code) ? "bg-gray-50" : ""
                }`}
              >
                <span>{opt.name} ({opt.code})</span>
                {value.includes(opt.code) && <span className="text-green-600 font-semibold">✓</span>}
              </div>
            ))
          )}
        </div>
      )}

      {error && <div className="text-sm text-red-600 mt-1">{error}</div>}
    </div>
  );
}
