const db = require("../db");

const createItem = (request, response) => {
  const item_name = request.body.item_name;
  const category = request.body.category;
  const origin = request.body.origin;
  const price = request.body.price;
  const description = request.body.description;
  const queryText = `INSERT INTO item (item_name, category, origin, price, description) VALUES ($1, $2, $3, $4, $5)`;
  db.query(
    queryText,
    [item_name, category, origin, price, description],
    (error, results) => {
      if (error) {
        return console.error(error.message);
      }
      response.status(200).json({ result: "ItemAdded" });
    }
  );
};

const getAllItem = (request, response) => {
  const queryText = `SELECT * FROM item ORDER BY id ASC;`;
  db.query(queryText, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    response.status(200).json(results.rows);
  });
};

const getStartItem = (request, response) => {
  const queryText = `SELECT * FROM item ORDER BY id DESC LIMIT 3;`;
  db.query(queryText, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    response.status(200).json(results.rows);
  });
};

const getMoreItem = (request, response) => {
  const id = request.params.id;
  const queryText = `SELECT * FROM item WHERE id < $1 ORDER BY id DESC LIMIT 3;`;
  db.query(queryText, [id], (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    response.status(200).json(results.rows);
  });
};

const getAllItemByCategory = (request, response) => {
  const category = request.params.category;
  const queryText = `SELECT * FROM item WHERE category = $1 ORDER BY id ASC`;
  db.query(queryText, [category], (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    response.status(200).json(results.rows);
  });
};

const deleteItem = (request, response) => {
  const id = request.params.id;
  const queryText = `DELETE FROM item WHERE id = $1`;
  db.query(queryText, [id], (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    response.status(200).json({ result: "ItemDeleted" });
  });
};

const getCurrentItem = (request, response) => {
  const queryText = `SELECT MAX(id) FROM (SELECT * FROM item) AS X`;
  db.query(queryText, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    response.status(200).json(results.rows);
  });
};

const getItemByID = (request, response) => {
  const id = request.params.id;
  const queryText = `SELECT * FROM item WHERE id=$1`;
  db.query(queryText, [id], (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    response.status(200).json(results.rows);
  });
};

const getAllItemByName = (request, response) => {
  const name = request.params.name;
  db.query(
    "SELECT * FROM item WHERE UPPER(item_name) LIKE UPPER('%" + name + "%')",
    (error, results) => {
      if (error) {
        return console.error(error.message);
      }
      response.status(200).json(results.rows);
    }
  );
};

const updateItem = (request, response) => {
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
  db.query(
    queryText,
    [item_name, category, origin, price, description, id],
    (error, results) => {
      if (error) {
        return console.error(error.message);
      }
      response.status(200).json({ result: "ItemUpdated" });
    }
  );
};

module.exports = {
  createItem,
  getAllItem,
  getStartItem,
  getMoreItem,
  getAllItemByCategory,
  getCurrentItem,
  getItemByID,
  getAllItemByName,
  updateItem,
  deleteItem
};
