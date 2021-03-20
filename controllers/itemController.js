const db = require("../db");

const createItem = async (request, response, next) => {
  const item_name = request.body.item_name;
  const category = request.body.category;
  const origin = request.body.origin;
  const price = request.body.price;
  const description = request.body.description;
  const queryText = `INSERT INTO item (item_name, category, origin, price, description) VALUES ($1, $2, $3, $4, $5)`;

  try {
    const result = await db.query(queryText, [
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

const getAllItem = async (request, response, next) => {
  const queryText = `SELECT * FROM item ORDER BY id ASC;`;
  try {
    const result = await db.query(queryText);
    response.status(200).json(result.rows);
  } catch (error) {
    console.log("getAllItem error");
    console.log(error.message);
    next(error);
  }
  // db.query(queryText, (error, results) => {
  //   if (error) {
  //     return console.log(error.message);
  //   }
  //   response.status(200).json(results.rows);
  // });
};

const getAllStartingItem = async (request, response, next) => {
  const queryText = `SELECT * FROM item ORDER BY id DESC LIMIT 3;`;
  try {
    const result = await db.query(queryText);
    response.status(200).json(result.rows);
  } catch (error) {
    console.log("getStartItem error");
    console.log(error.message);
    next(error);
  }
};

const getMoreItem = async (request, response, next) => {
  const id = request.params.id;
  const queryText = `SELECT * FROM item WHERE id < $1 ORDER BY id DESC LIMIT 3;`;
  try {
    const result = await db.query(queryText, [id]);
    response.status(200).json(result.rows);
  } catch (error) {
    console.log("getMoreItem error");
    console.log(error.message);
    next(error);
  }
};

const getAllItemByCategory = async (request, response, next) => {
  const category = request.params.category;
  const queryText = `SELECT * FROM item WHERE category = $1 ORDER BY id ASC`;
  try {
    const result = await db.query(queryText, [category]);
    response.status(200).json(result.rows);
  } catch (error) {
    console.log("getAllItemByCategory error");
    console.log(error.message);
    next(error);
  }
};

const deleteItem = async (request, response, next) => {
  const id = request.params.id;
  const queryText = `DELETE FROM item WHERE id = $1`;
  try {
    const result = await db.query(queryText, [id]);
    response.status(200).json({ result: "ItemDeleted" });
  } catch (error) {
    console.log("deleteItem error");
    console.log(error.message);
    next(error);
  }
};

const getCurrentItem = async (request, response, next) => {
  const queryText = `SELECT MAX(id) FROM (SELECT * FROM item) AS pg_sucks`;
  try {
    const result = await db.query(queryText);
    response.status(200).json(result.rows);
  } catch (error) {
    console.log("getCurrentItem error");
    console.log(error.message);
    next(error);
  }
};

const getItemById = async (request, response, next) => {
  const id = request.params.id;
  const queryText = `SELECT * FROM item WHERE id=$1`;
  try {
    const result = await db.query(queryText, [id]);
    response.status(200).json(result.rows);
  } catch (error) {
    console.log("getItemById error");
    console.log(error.message);
    next(error);
  }
};

const getAllItemByName = async (request, response, next) => {
  const name = request.params.name;
  try {
    const result = await db.query(
      "SELECT * FROM item WHERE UPPER(item_name) LIKE UPPER('%" + name + "%')"
    );
    response.status(200).json(result.rows);
  } catch (error) {
    console.log("getAllItemByName error");
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
  SET item_name = $1, category = $2, origin = $3, price = $4, description = $5 
  WHERE id = $6`;
  try {
    const result = await db.query(queryText, [
      item_name,
      category,
      origin,
      price,
      description,
      id
    ]);
    response.status(200).json({ result: "ItemUpdated" });
  } catch (error) {
    console.log("updateItem error");
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  createItem,
  getAllItem,
  getAllStartingItem,
  getMoreItem,
  getAllItemByCategory,
  getCurrentItem,
  getItemById,
  getAllItemByName,
  updateItem,
  deleteItem
};
