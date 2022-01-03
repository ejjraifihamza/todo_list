let http = require("http");
let Todo = require("./controller");
let { getPostData } = require("./utils");
let port = 3000;

let server = http.createServer(async (req, res) => {
  if (req.url == "/api/todos" && req.method == "GET") Todo.getAllTodos(res);
  else if (
    req.url.match(/\/api\/todos\/([a-z A-Z 0-9]+)/) &&
    req.method == "GET"
  ) {
    let id = req.url.split("/")[3];
    Todo.getById(id, res);
  } else if (req.url == "/api/todos" && req.method == "DELETE") {
    Todo.deleteAll(res);
  } else if (
    req.url.match(/\/api\/todos\/([a-z A-Z 0-9]+)/) &&
    req.method == "DELETE"
  ) {
    try {
      let id = req.url.split("/")[3];
      await Todo.deleteById(id, res);
    } catch (error) {
      console.log(error);
    }
  } else if (req.url == "/api/todos" && req.method == "POST") {
    let body = await getPostData(req);
    const { title, description } = JSON.parse(body);
    try {
      await Todo.addTodo(title, description, res);
    } catch (err) {
      console.log(err);
    }
  } else if (
    req.url.match(/\/api\/todos\/([a-z A-Z 0-9]+)/) &&
    req.method === "PATCH"
  ) {
    try {
      let body = await getPostData(req);
      let id = req.url.split("/")[3];
      await Todo.updateById(id, JSON.parse(body), res);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.writeHead(404, { "Content-type": "application.json" });
    res.end(JSON.stringify({ message: "Oops Route not found!" }));
  }
});

server.listen(port, () => console.log(`Server listening on port ${port}!!!`));
