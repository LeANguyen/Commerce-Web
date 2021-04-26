const db = require("../db");

// Cart
const getCurrentCart = async (request, response, next) => {
  const client_id = request.params.client_id;

  const queryText = `
  SELECT * 
  FROM cart
  WHERE id = (
    SELECT MAX(id) 
    FROM (
      SELECT * 
      FROM cart 
      WHERE client_id = $1) AS X)`;

  try {
    const result = await db.query(queryText, [client_id]);
    response.status(200).json(result.rows);
  } catch (error) {
    console.log("getCurrentCart error");
    console.log(error.message);
    next(error);
  }
};

const getAllCart = async (request, response, next) => {
  const client_id = request.params.client_id;
  const queryText = `SELECT * FROM cart WHERE client_id = $1`;

  try {
    const result = await db.query(queryText, [client_id]);
    response.status(200).json(result.rows);
  } catch (error) {
    console.log("getAllCart error");
    console.log(error.message);
    next(error);
  }
};

const createCart = async (request, response, next) => {
  const client_id = request.params.client_id;
  const queryText = `INSERT INTO cart (client_id) VALUES ($1)`;
  try {
    await db.query(queryText, [client_id]);
    response.status(200).json({ result: "CartAdded" });
  } catch (error) {
    console.log("createCart error");
    console.log(error.message);
    next(error);
  }
};

const updateCurrentCart = async (request, response, next) => {
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
  try {
    const result = await db.query(queryText, [
      client_name,
      address,
      phone,
      checkout_date,
      client_id
    ]);
    response.status(200).json({ result: "CurrentCartUpdated" });
  } catch (error) {
    console.log("updateCurrentCart error");
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  getCurrentCart,
  getAllCart,
  createCart,
  updateCurrentCart
};
