const db = require("../db");

// crypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Client
const createClient = (request, response) => {
  const email = request.body.email;
  const pass = request.body.pass;
  const name = request.body.name;
  const queryText = `INSERT INTO client (name, email, pass) VALUES ($1, $2, $3)`;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(pass, salt, function(err, hash) {
      // store hashed password in DB
      db.query(queryText, [name, email, hash], (error, results) => {
        if (error) {
          return console.error(error.message);
        }
      });
      response.status(200).json({ result: "ClientAdded" });
    });
  });
};

const getClientByEmail = (request, response) => {
  const email = request.params.email;
  const queryText = `SELECT (email, id) FROM client WHERE email = $1`;
  db.query(queryText, [email], (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    response.status(200).json(results.rows);
  });
};

const getClientByEmailAndPass = (request, response) => {
  const email = request.body.email;
  const pass = request.body.pass;
  const queryText = `SELECT * FROM client WHERE email = $1`;
  db.query(queryText, [email], (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    // valid username but let's see if the password is correct
    if (results.rowCount != 0) {
      bcrypt.compare(pass, results.rows[0].pass, function(err, result) {
        if (result == true) {
          response.status(200).json(results.rows);
        } else {
          response.status(200).json([]);
        }
      });
    } else {
      response.status(200).json([]);
    }
  });
};

module.exports = {
  createClient,
  getClientByEmail,
  getClientByEmailAndPass
};
