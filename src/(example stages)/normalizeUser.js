
function capitalizeName(name) {
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

module.exports = function normalizeUser(data) {
  const cleaned = { ...data };

  // Capitalize name
  if (typeof cleaned.name === "string") {
    cleaned.name = capitalizeName(cleaned.name.trim());
  }

  // Clean phone number (digits only)
  if (typeof cleaned.phone === "string") {
    cleaned.phone = cleaned.phone.replace(/\D/g, "");
  }

  // Add isAdult flag
  if (typeof cleaned.age === "number") {
    cleaned.isAdult = cleaned.age >= 18;
  }

  return cleaned;
};
