import React, { useEffect, useState } from "react";
import Input from "./Input";
import MultiSelect from "./MultiSelect";
import { validateUser } from "../utils/validators";

export default function UserForm({ initial, countries, onCancel, onSave }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [code, setCode] = useState(initial?.code ?? "");
  const [sel, setSel] = useState(initial?.countries ?? []);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(initial?.name ?? "");
    setCode(initial?.code ?? "");
    setSel(initial?.countries ?? []);
  }, [initial]);

  const handleSave = async () => {
    const user = { name: name.trim(), code: code?.trim() || undefined, countries: sel };
    const v = validateUser(user);
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setSaving(true);
    try {
      await onSave(user);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Input label="User Name" value={name} onChange={setName} error={errors.name} placeholder="Enter a user name" />
      <Input label="User Code (Optional)" value={code} onChange={setCode} placeholder="Short code e.g. EU" />
      <MultiSelect options={countries} value={sel} onChange={setSel} error={errors.countries} placeholder="Choose countries" />
      <div className="flex justify-end gap-2 mt-3">
        <button onClick={onCancel} className="px-3 py-1 rounded border">Cancel</button>
        <button onClick={handleSave} disabled={saving} className="px-4 py-1 rounded bg-black text-white">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
