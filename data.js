let mysql = require("mysql2");
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_api",
});
con.connect((err) => {
  if (err) throw err;
  console.log("Conected!");
});

exports.getTodos = () =>
  new Promise((resolve, reject) => {
    let sql1 = "SELECT * FROM todos ORDER BY id ASC";
    con.query(sql1, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

exports.deleteTodos = () =>
  new Promise((resolve, reject) => {
    let sql1 = "DELETE FROM todos";
    con.query(sql1, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

exports.getTodoById = (id) => {
  new Promise((resolve, reject) => {
    let sql1 = `SELECT * FROM todos WHERE id = ${id}`;
    con.query(sql1, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.deleteTodoById = (id) => {
  new Promise((reject) => {
    let sql = `DELETE FROM todos WHERE id = ${id}`;
    con.query(sql, (err) => {
      if (err) reject(err);
    });
  });
};

exports.addTodo = (id, title, description) => {
  new Promise((reject) => {
    let sql = `INSERT INTO todos (id, title, description) VALUES ('${id}', '${title}', '${description}')`;
    con.query(sql, (err) => {
      if (err) reject(err);
    });
  });
};

exports.updateById = (id, title, description) => {
  new Promise((reject) => {
    let sql = `UPDATE todos SET title = '${title}', description = '${description}' WHERE id = '${id}'`;
    con.query(sql, (err) => {
      if (err) reject(err);
    });
  });
};
