const bcrypt = require("bcrypt");

const checkPassword = (password, hassPassword) => {
  return bcrypt.compareSync(password, hassPassword);
};

module.exports = checkPassword;
