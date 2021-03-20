const db = require("./index");
const dropTables = async () => {
  const queryText = `
  DROP TABLE IF EXISTS cart_item; 
  DROP TABLE IF EXISTS cart;
  DROP TABLE IF EXISTS item;
  DROP TABLE IF EXISTS client;`;

  try {
    const result = await db.query(queryText);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
  db.end();

  // db.query(queryText)
  //   .then(res => {
  //     console.log(res);
  //     db.end();
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     db.end();
  //   });
};

db.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

module.exports = dropTables;
require("make-runnable");
