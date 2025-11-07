export function validateUser(u) {
  const errors = {};
  if (!u.name || !u.name.trim()) errors.name = "User name is required";
  if (!u.countries || u.countries.length === 0)
    errors.countries = "Select at least one country";
  return errors;
}
