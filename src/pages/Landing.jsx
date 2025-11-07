import React from "react";

export default function Landing({ onNew }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white rounded shadow p-8">
      <div className="mb-4">
        <div className="w-36 h-36 rounded-full bg-gradient-to-b from-gray-200 to-white flex items-center justify-center">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path d="M12 12a5 5 0 100-10 5 5 0 000 10z" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 21a9 9 0 0118 0" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-2">Create a New User</h2>
      <p className="text-gray-600 mb-6">Add users and assign countries to get started.</p>
      <button onClick={onNew} className="px-4 py-2 rounded bg-black text-white">+ New User</button>
    </div>
  );
}
