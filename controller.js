let data = require("./data");

let todos = "";

exports.getAllTodos = async (res) => {
  todos = await data.getTodos();
  res.writeHead(200, { "Content-type": "application/json" });
  res.end(JSON.stringify(todos));
};

exports.getById = async (id, res) => {
  todos = await data.getTodos();
  let todo = todos.find((todo) => (todo.id = id));
  if (todo) {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(todo));
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "not find" }));
  }
};

exports.deleteById = async (id, res) => {
  todos = await data.getTodos();
  let newTodos = todos.filter((todo) => todo.id != id);
  todos = newTodos;
  if (todos) {
    await data.deleteTodoById(id);
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "Todo deleted successfully" }));
  } else {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "Ooops Something Goes wrong!" }));
  }
};

exports.deleteAll = async (res) => {
  todos = "";
  await data.deleteTodos();
  res.writeHead(200, { "Content-type": "application/json" });
  res.end(JSON.stringify({ message: "Done" }));
};

exports.updateById = async (id, body, res) => {
  todos = await data.getTodos();
  let { title, description } = body;
  await data.updateById(id, title, description);
  res.writeHead(200, { "Content-type": "application/json" });
  res.end(JSON.stringify({ message: "Updated Successfully" }));
};

exports.addTodo = async (title, description, res) => {
  let id = Date.now().toString();
  await data.addTodo(id, title, description);
  try {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "Todo Added Successfully" }));
  } catch (err) {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "Oops Something Goes Wrong" }));
  }
};
