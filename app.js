const express = require("express");
const bodyParser = require("body-parser");
const { writeTodosToFile } = require("./write");
const { readTodosFromFile } = require("./read");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/todos", (req, res) => {
  const todos = readTodosFromFile();
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const todos = readTodosFromFile();
  const todo = todos.find((t) => t.id === parseInt(req.params.id));

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.post("/todos", (req, res) => {
  const todos = readTodosFromFile();
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false,
  };

  todos.push(newTodo);
  writeTodosToFile(todos);

  res.json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const todos = readTodosFromFile();
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));

  if (todoIndex !== -1) {
    todos[todoIndex].title = req.body.title ?? todos[todoIndex].title;
    todos[todoIndex].completed =
      JSON.parse(req.body.completed) ?? JSON.parse(todos[todoIndex].completed);
    writeTodosToFile(todos);
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.delete("/todos/:id", (req, res) => {
  const todos = readTodosFromFile();
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));

  if (todoIndex !== -1) {
    const deletedTodo = todos.splice(todoIndex, 1);
    writeTodosToFile(todos);
    res.json(deletedTodo[0]);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
