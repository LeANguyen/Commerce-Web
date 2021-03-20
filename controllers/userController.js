const db = require("../db");
const hashPassword = require("../helpers/hashPassword");
const checkPassword = require("../helpers/checkPassword");
const generateToken = require("../helpers/generateToken");

const register = async (request, response, next) => {
  const email = request.body.email;
  const pass = request.body.pass;
  const name = request.body.name;
  const queryText = `INSERT INTO client (name, email, pass, role) VALUES ($1, $2, $3, 'user')`;
  const hashedPassword = hashPassword(pass);
  try {
    const result = await db.query(queryText, [name, email, hashedPassword]);
    response.status(200).json({
      status: 200,
      success: true,
      message: "User created successfull"
    });
  } catch (error) {
    console.log("register error");
    console.log(error.message);
    next(error);
  }
};

const login = async (request, response, next) => {
  const email = request.body.email;
  const pass = request.body.pass;
  const queryText = `SELECT * FROM client WHERE email = $1`;

  try {
    const result = await db.query(queryText, [email]);

    if (result.rowCount != 0) {
      const validPassword = checkPassword(pass, result.rows[0].pass);
      if (validPassword) {
        const token = generateToken({
          id: result.rows[0].id,
          name: result.rows[0].name,
          email: result.rows[0].email,
          role: result.rows[0].role
        });
        response.status(200).json(token);
      } else {
        response.status(200).json([]);
      }
    } else {
      response.status(200).json([]);
    }
  } catch (error) {
    console.log("login error");
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  register,
  login
};
