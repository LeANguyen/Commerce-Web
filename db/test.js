const util = require("util");
const exec = util.promisify(require("child_process").exec);

const test = async () => {
  await executeCmdLine("node db/dropTables");
  await executeCmdLine("node db/createTables");
  await executeCmdLine("node db/insertDummyItems");
  await executeCmdLine("node db/createDummyImages");
};

const executeCmdLine = async cmd => {
  const { stdout, stderr } = await exec(cmd);
  if (stderr) {
    console.error(`error: ${stderr}`);
  }
  console.log(`Number of files ${stdout}`);
};

module.exports = test;
require("make-runnable");
