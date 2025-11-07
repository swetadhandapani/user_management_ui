import React from "react";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("userInfo")) || {
    name: "Guest",
    email: "guest@example.com",
    role: "Viewer",
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          👤 Profile
        </h2>

        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Name:</span>
            <span>{user.name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Email:</span>
            <span>{user.email}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Role:</span>
            <span>{user.role || "User"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Joined:</span>
            <span>
              {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => alert("Edit Profile Coming Soon!")}
            className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
