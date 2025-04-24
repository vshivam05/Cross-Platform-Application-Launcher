const fs = require("fs");
const { DATA_PATH } = require("../config");

exports.readApps = () => {
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
};

exports.writeApps = (apps) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(apps, null, 2));
};
