const db = require("./index");
const alterTables = async () => {
  const queryText = `
  ALTER TABLE client
  ADD UNIQUE (email);`;

  try {
    const result = await db.query(queryText);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
  db.end();
};

module.exports = alterTables;
require("make-runnable");
