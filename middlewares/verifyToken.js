const jwt = require("jsonwebtoken");
const db = require("../db");
require("dotenv").config();

const verifyToken = async (req, res, next, roles = []) => {
  const { token: headerToken = "" } = req.headers;
  const status = 400;
  const success = false;
  // check if there is a JWT provided
  if (!headerToken) {
    return res
      .status(401)
      .json({ status: 401, success: false, message: "No token provided" });
  }

  try {
    // check if the provided JWT is valid
    const decoded = await jwt.verify(headerToken, process.env.TOKEN_SECRET);
    if (!decoded)
      return res
        .status(status)
        .json({ status: 401, success: false, error: "Invalid token provided" });

    // incase the JWT is valid (if the hacker somehow got the secret key)
    // check if the payload (user's email) belonged in the database
    // const { rows } = await userController.getClientByEmail([decoded]);
    const { rows } = await db.query(`SELECT * FROM client WHERE email = $1`, [
      decoded.email
    ]);

    if (!rows[0]) {
      return res
        .status(401)
        .json({ status: 401, success: false, error: "Invalid token provided" });
    }

    if (roles.length && !roles.includes(decoded.role)) {
      // user's role is not authorized
      return res
        .status(401)
        .json({ status: 401, success: false, error: "Unauthorized role" });
    }

    // authentication and authorization successful
    next();
  } catch (error) {
    return res.status(status).json({ status, success, error: error.message });
  }
};

module.exports = verifyToken;
