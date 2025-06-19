module.exports = function trimFields(data) {
  const cleaned = {};
  for (const key in data) {
    const value = data[key];
    cleaned[key] = typeof value === "string" ? value.trim() : value;
  }
  return cleaned;
};
