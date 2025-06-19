module.exports = function lowercaseEmails(data) {
  if (!data.email) return data;
  return { ...data, email: data.email.toLowerCase() };
};
