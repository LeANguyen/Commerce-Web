const jwt = require("jsonwebtoken");
const db = require("../db");
const userController = require("../controllers/userController");

const verifyToken = async (req, res, next) => {
  const success = false;
  let status = 401;

  const { token: headerToken = "" } = req.headers;

  // check if there is a JWT provided
  if (!headerToken) {
    status = 400;
    return res
      .status(400)
      .json({ status: 400, success: false, message: "No token provided" });
  }

  try {
    // check if the provided JWT is valid
    const decoded = await jwt.verify(headerToken, privateKey);

    if (!decoded)
      return res
        .status(status)
        .json({ status: 400, success: false, error: "Invalid token provided" });

    // incase the JWT is valid (if the hacker somehow got the secret key)
    // check if the payload (user's email) belonged in the database
    // const { rows } = await userController.getClientByEmail([decoded]);
    const {
      rows
    } = await db.pool.query(`SELECT * FROM client WHERE email = $1`, [decoded]);

    if (!rows[0]) {
      return res
        .status(400)
        .json({ status, success, error: "Invalid token provided" });
    }

    req.currentEmployee = rows[0];

    next();
  } catch (error) {
    return res.status(status).json({ status, success, error: error.message });
  }
};
