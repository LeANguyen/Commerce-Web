const db = require("../db");

const createItem = async (request, response, next) => {
  const item_name = request.body.item_name;
  const category = request.body.category;
  const origin = request.body.origin;
  const price = request.body.price;
  const description = request.body.description;
  const queryText = `INSERT INTO item (item_name, category, origin, price, description) VALUES ($1, $2, $3, $4, $5)`;

  try {
    await db.query(queryText, [
      item_name,
      category,
      origin,
      price,
      description
    ]);
    response.status(200).json({ result: "ItemAdded" });
  } catch (error) {
    console.log("createItem error");
    console.log(error.message);
    next(error);
  }
};

const getItems = async (request, response, next) => {
  const limit = request.params.limit;
  const skip = request.params.skip;

  const queryText = `SELECT * FROM item ORDER BY id DESC LIMIT ${limit} OFFSET ${skip}`;
  try {
    const result = await db.query(queryText);
    response.status(200).json(result.rows);
  } catch (error) {
    console.log("getItems error");
    console.log(error.message);
    next(error);
  }
};

const getItemsByCategory = async (request, response, next) => {
  const category = request.params.category;
  const queryText = `SELECT * FROM item WHERE category = '${category}' ORDER BY id ASC`;
  try {
    const result = await db.query(queryText);
    response.status(200).json(result.rows);
  } catch (error) {
    console.log("getItemsByCategory error");
    console.log(error.message);
    next(error);
  }
};

const deleteItem = async (request, response, next) => {
  const id = request.params.id;
  const queryText = `DELETE FROM item WHERE id = $1`;
  try {
    await db.query(queryText, [id]);
    response.status(200).json({ result: "ItemDeleted" });
  } catch (error) {
    console.log("deleteItem error");
    console.log(error.message);
    next(error);
  }
};

const getLatestItem = async (request, response, next) => {
  const queryText = `SELECT MAX(id) FROM (SELECT * FROM item) AS pg_sucks`;
  try {
    const result = await db.query(queryText);
    response.status(200).json(result.rows);
  } catch (error) {
    console.log("getLatestItem error");
    console.log(error.message);
    next(error);
  }
};

const getItemById = async (request, response, next) => {
  const id = request.params.id;
  const queryText = `SELECT * FROM item WHERE id=${id}`;
  try {
    const result = await db.query(queryText);
    response.status(200).json(result.rows);
  } catch (error) {
    console.log("getItemById error");
    console.log(error.message);
    next(error);
  }
};

const getItemsByName = async (request, response, next) => {
  const name = request.params.name;
  const queryText = `SELECT * FROM item WHERE UPPER(item_name) LIKE UPPER('%${name}%')`;
  try {
    const result = await db.query(queryText);
    response.status(200).json(result.rows);
  } catch (error) {
    console.log("getItemsByName error");
    console.log(error.message);
    next(error);
  }
};

const updateItem = async (request, response, next) => {
  const id = request.params.id;
  const item_name = request.body.item_name;
  const category = request.body.category;
  const origin = request.body.origin;
  const price = request.body.price;
  const description = request.body.description;
  const queryText = `
  UPDATE item 
  SET item_name = '${item_name}', category = '${category}', origin = '${origin}', price = '${price}', description = '${description}' 
  WHERE id = ${id}`;
  try {
    await db.query(queryText);
    response.status(200).json({ result: "ItemUpdated" });
  } catch (error) {
    console.log("updateItem error");
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  createItem,
  getItems,
  getItemsByCategory,
  getLatestItem,
  getItemById,
  getItemsByName,
  updateItem,
  deleteItem
};
