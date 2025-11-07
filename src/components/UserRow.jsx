import React from "react";
import Tag from "./Tag";

export default function UserRow({ user, onView, onEdit, onDelete }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">{user.name}</td>
      <td className="px-4 py-3">{user.code ?? "-"}</td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {user.countries.map((c) => (
            <Tag key={c}>{c}</Tag>
          ))}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => onView(user)}
            className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
          >
            View
          </button>
          <button
            onClick={() => onEdit(user)}
            className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(user)}
            className="text-sm px-2 py-1 border rounded text-red-600 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
