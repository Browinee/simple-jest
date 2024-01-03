const fs = require("fs");
function sum(a, b) {
  return a + b;
}
function read() {
  const pkg = JSON.parse(fs.readFileSync("./package.json"));
  return pkg.version === "1.0.0" ? 111 : 222;
}
module.exports = {
  sum,
  read,
};
