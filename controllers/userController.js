const db = require("../db");
const { hashPassword, checkPassword, generateToken } = require("../helpers");

const register = async (request, response, next) => {
  const name = request.body.name;
  const email = request.body.email;
  const password = request.body.password;
  const queryText = `INSERT INTO client (name, email, pass, role) VALUES ($1, $2, $3, 'user')`;
  const hashedPassword = hashPassword(password);
  try {
    await db.query(queryText, [name, email, hashedPassword]);
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
  const password = request.body.password;
  const queryText = `SELECT * FROM client WHERE email = '${email}'`;

  try {
    const result = await db.query(queryText);

    if (result.rowCount != 0) {
      const validPassword = checkPassword(password, result.rows[0].pass);
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
