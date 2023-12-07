const todoData = "data.json";
const fs = require("fs");

const writeTodosToFile = (todos) => {
  fs.writeFileSync(todoData, JSON.stringify(todos, null, 2), "utf8");
};

module.exports = {
  writeTodosToFile,
};
