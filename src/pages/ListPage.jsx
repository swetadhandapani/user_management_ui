import React, { useMemo, useState } from "react";
import { useUsers } from "../contexts/UserContext";
import UserRow from "../components/UserRow";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { useToast } from "../components/Toast";

export default function ListPage({ onNew, onView, onEdit, onBack }) {
  const { users, loading, removeUser } = useUsers();
  const [filter, setFilter] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { once } = useToast(); 

  const filtered = useMemo(
    () =>
      users.filter((u) =>
        u.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [users, filter]
  );

  if (loading) return <div>Loading...</div>;

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await removeUser(selectedUser.id);
      setDeleteModal(false); // ✅ close modal
      once(`User "${selectedUser.name}" deleted successfully ✅`); 
    } catch (err) {
      once("Failed to delete user ❌", "error");
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      {/* Header with Back and Add buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            onClick={onBack}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            ← Back
          </button>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search users"
            className="border rounded px-3 py-1"
          />
        </div>
        <button
          onClick={onNew}
          className="px-4 py-2 rounded bg-black text-white"
        >
          + New User
        </button>
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left text-sm text-gray-600">
            <th className="px-4 py-2">User Name</th>
            <th className="px-4 py-2">User Code</th>
            <th className="px-4 py-2">Countries</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            filtered.map((u) => (
              <UserRow
                key={u.id}
                user={u}
                onView={onView}
                onEdit={onEdit}
                onDelete={() => handleDeleteClick(u)}
              />
            ))
          )}
        </tbody>
      </table>

      <DeleteConfirmModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={confirmDelete}
        itemName={selectedUser?.name}
      />
    </div>
  );
}
