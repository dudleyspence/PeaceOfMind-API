exports.getAge = (date) => {
  const now = new Date();
  const age = now.getFullYear() - date.getFullYear();
  return age;
};
