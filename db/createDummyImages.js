const db = require("./index");
const path = require("path");
const fs = require("fs");

// We want to create 45 image files for 45 dummy items in the store
// We will copy and paste 45 image files from ./images/dummy to ./images/store
const createDummyImages = async () => {
  for (i = 0; i < 45; i++) {
    // Prepare the path for the paste destination
    const filePathStore = path.join(
      __dirname,
      "..",
      "public",
      "images",
      "store",
      "item-" + (i + 1) + ".png"
    );

    // We want 15 shirts, 15 pants, 15 shoes in order
    let dummyFile = "";
    const max = 4;
    min = 1;
    if (i < 15) {
      dummyFile =
        "shirt-" + Math.floor(Math.random() * (max - min) + min) + ".jpeg";
    }
    if (i >= 15 && i < 30) {
      dummyFile =
        "pant-" + Math.floor(Math.random() * (max - min) + min) + ".jpeg";
    }
    if (i >= 30 && i < 45) {
      dummyFile =
        "shoe-" + Math.floor(Math.random() * (max - min) + min) + ".jpeg";
    }

    // Prepare the path of the selected dummy file
    const filePathDummy = path.join(
      __dirname,
      "..",
      "public",
      "images",
      "dummy",
      dummyFile
    );

    // Copy and paste the selected dummy file to the store directory
    fs.copyFile(filePathDummy, filePathStore, err => {
      if (err) throw err;
      console.log("File was copied to destination");
    });
  }
};

module.exports = createDummyImages;
require("make-runnable");
