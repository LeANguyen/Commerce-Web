const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Gnerate Token
 * @param {int} data
 * @returns {string} token
 */
const generateToken = data => {
  const token = jwt.sign(data, process.env.TOKEN_SECRET);
  return token;
};

module.exports = generateToken;
