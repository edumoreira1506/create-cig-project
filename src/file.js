const fs = require('fs');

const readFile = (path) => fs.readFileSync(path, 'utf8');

const saveFile = (path, data) => fs.writeFile(path, data, (err) => {
  if (err) {
    return console.log(err);
  }
});

module.exports = { readFile, saveFile };
