const db = require("./index");
const insertDummyItems = async () => {
  const origins = ["Vietnam", "China", "USA"];

  for (i = 0; i < 15; i++) {
    const itemName = "Test Shirt" + " " + Math.floor(Math.random() * 1000);
    const category = "Shirt";
    const origin = origins[Math.floor(Math.random() * 3)];
    const price = Math.floor(Math.random() * 1000);
    const description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non.";
    const queryText = `INSERT INTO item (item_name, category, origin, price, description) VALUES ('${itemName}', '${category}', '${origin}', '${price}', '${description}');`;

    await query(queryText);
  }

  for (i = 0; i < 15; i++) {
    const itemName = "Test Pant" + " " + Math.floor(Math.random() * 1000);
    const category = "Pant";
    const origin = origins[Math.floor(Math.random() * 3)];
    const price = Math.floor(Math.random() * 1000);
    const description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non.";
    const queryText = `INSERT INTO item (item_name, category, origin, price, description) VALUES ('${itemName}', '${category}', '${origin}', '${price}', '${description}');`;

    await query(queryText);
  }

  for (i = 0; i < 15; i++) {
    const itemName = "Test Shoe" + " " + Math.floor(Math.random() * 1000);
    const category = "Shoe";
    const origin = origins[Math.floor(Math.random() * 3)];
    const price = Math.floor(Math.random() * 1000);
    const description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non.";
    const queryText = `INSERT INTO item (item_name, category, origin, price, description) VALUES ('${itemName}', '${category}', '${origin}', '${price}', '${description}');`;

    await query(queryText);
  }
  db.end();
};

const query = async queryText => {
  try {
    const result = await db.query(queryText);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = insertDummyItems;
require("make-runnable");
