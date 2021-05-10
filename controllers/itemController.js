const db = require("../db");

const createItem = async (request, response, next) => {
  const itemName = request.body.itemName;
  const category = request.body.category;
  const origin = request.body.origin;
  const price = request.body.price;
  const description = request.body.description;
  const queryText = `INSERT INTO item (item_name, category, origin, price, description) VALUES ($1, $2, $3, $4, $5)`;

  try {
    await db.query(queryText, [itemName, category, origin, price, description]);
    response.status(200).json({ result: "ItemAdded" });
  } catch (error) {
    console.log("createItem error");
    console.log(error.message);
    next(error);
  }
};

const searchItems = async (request, response, next) => {
  const itemName = request.body.itemName;
  const category =
    request.body.category === "Any"
      ? `ANY(SELECT DISTINCT category FROM item)`
      : `'${request.body.category}'`;
  const origin =
    request.body.origin === "Any"
      ? `ANY(SELECT DISTINCT origin FROM item)`
      : `'${request.body.origin}'`;
  const priceFrom =
    request.body.priceFrom !== "" ? parseInt(request.body.priceFrom) : 0;
  const priceTo =
    request.body.priceTo !== ""
      ? parseInt(request.body.priceTo)
      : `FLOAT8 '+infinity'`;
  const limit = request.query.limit;
  const skip = request.query.skip;

  const queryText1 = `SELECT COUNT(*) FROM item 
  WHERE UPPER(item_name) LIKE UPPER('%${itemName}%') 
  AND category=${category} 
  AND origin=${origin} 
  AND price >= ${priceFrom} 
  AND price <= ${priceTo}`;

  const queryText2 = `SELECT * FROM item 
  WHERE UPPER(item_name) LIKE UPPER('%${itemName}%') 
  AND category=${category} 
  AND origin=${origin}
  AND price >= ${priceFrom} 
  AND price <= ${priceTo} ORDER BY id DESC LIMIT ${limit} OFFSET ${skip}`;

  const queryText = `SELECT (${queryText1}) AS count, (SELECT coalesce(json_agg(t.*), '[]'::json) FROM (${queryText2}) AS t) AS rows`;

  try {
    const result = await db.query(queryText);
    response.status(200).json(result.rows[0]);
  } catch (error) {
    console.log("searchItems error");
    console.log(error.message);
    next(error);
  }
};

const getItems = async (request, response, next) => {
  const limit = request.query.limit ? request.query.limit : 5;
  const skip = request.query.skip ? request.query.skip : 0;

  const queryText1 = `SELECT COUNT(*) FROM item`;
  const queryText2 = `SELECT * FROM item ORDER BY id DESC LIMIT ${limit} OFFSET ${skip}`;
  const queryText = `SELECT (${queryText1}) AS count, (SELECT coalesce(json_agg(t.*), '[]'::json) FROM (${queryText2}) AS t) AS rows`;
  try {
    const result = await db.query(queryText);
    response.status(200).json(result.rows[0]);
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
  deleteItem,
  searchItems
};
