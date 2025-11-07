import React from "react";

export default function Modal({ title, open, onClose, children, size = "md" }) {
  if (!open) return null;

  const width =
    size === "sm"
      ? "max-w-md"
      : size === "lg"
      ? "max-w-3xl"
      : "max-w-xl";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal container (click-stop propagation) */}
      <div
        className={`relative bg-white rounded-2xl shadow-xl p-6 ${width} w-full mx-4 transform transition-all scale-95 animate-zoomIn`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
}
