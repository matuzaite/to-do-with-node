const todoData = "data.json";
const fs = require("fs");

const readTodosFromFile = () => {
  try {
    const data = fs.readFileSync(todoData, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

module.exports = {
  readTodosFromFile,
};
