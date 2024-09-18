exports.getAge = (date) => {
  var now = new Date();
  var age = now.getFullYear() - date.getFullYear();
  return age;
};
