const db = require("./db");

const pool = db.pool;

// Cart
const getCurrentCart = (request, response) => {
  const client_id = request.params.client_id;

  const queryText = `
  SELECT * ASS
  FROM cart
  WHERE id = (
    SELECT MAX(id) 
    FROM (
      SELECT * 
      FROM cart 
      WHERE client_id = $1) AS X)`;

  pool.query(queryText, [client_id], (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    response.status(200).json(results.rows);
  });
};

const getAllCart = (request, response) => {
  const client_id = request.params.client_id;
  const queryText = `SELECT * FROM cart WHERE client_id = $1`;
  pool.query(queryText, [client_id], (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    response.status(200).json(results.rows);
  });
};

const createCart = (request, response) => {
  const client_id = request.params.client_id;
  const queryText = `INSERT INTO cart (client_id) VALUES ($1)`;
  pool.query(queryText, [client_id], (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    response.status(200).json({ result: "CartAdded" });
  });
};

const updateCurrentCart = (request, response) => {
  const client_id = request.params.client_id;
  const client_name = request.body.client_name;
  const address = request.body.address;
  const phone = request.body.phone;
  const checkout_date = request.body.checkout_date;
  const queryText = `
  UPDATE cart 
  SET client_name = $1, address = $2, phone = $3, checkout_date = $4
  WHERE id = (
    SELECT MAX(id) 
    FROM (
      SELECT * 
      FROM cart 
      WHERE client_id = $5) AS X)`;
  pool.query(
    queryText,
    [client_name, address, phone, checkout_date, client_id],
    (error, results) => {
      if (error) {
        return console.error(error.message);
      }
      response.status(200).json({ result: "CurrentCartUpdated" });
    }
  );
};

module.exports = {
  getCurrentCart,
  getAllCart,
  createCart,
  updateCurrentCart
};
