const fs = require('fs');

const saveJson = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, '\t'));

const readJson = (path) => {
  const data = fs.existsSync(path) ? fs.readFileSync(path) : {};

  try {
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
};

module.exports = {
  saveJson,
  readJson
};
