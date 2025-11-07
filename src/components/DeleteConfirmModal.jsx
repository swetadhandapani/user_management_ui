import React from "react";

export default function DeleteConfirmModal({ open, onClose, onConfirm, itemName }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      {/* Modal box */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-sm p-6 z-50">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Delete User</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900">{itemName}</span>?<br />
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
