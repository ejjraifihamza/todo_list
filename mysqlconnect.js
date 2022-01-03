let mysql = require("mysql2");
let connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_api",
});
module.exports = { connect };
