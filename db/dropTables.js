const db = require("./index");
const dropTables = () => {
  const queryText = `
  DROP TABLE IF EXISTS cart_item; 
  DROP TABLE IF EXISTS cart;
  DROP TABLE IF EXISTS item;
  DROP TABLE IF EXISTS client;`;

  db.query(queryText)
    .then(res => {
      console.log(res);
      db.end();
    })
    .catch(err => {
      console.log(err);
      db.end();
    });
};

db.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

module.exports = dropTables;
