const express = require('express');
const mysql = require("mysql2");
const app = express();


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gabibi89*",
  database: "bd_tasks"
});

db.connect(err => {
  if (err) throw err;
  console.log("Banco de dados conectado!");
});

app.get('/', (req, res) => {
  res.write('Ola! digite http://localhost:3000/users para ver os usuarios ou http://localhost:3000/tasks para ver as tarefas');
  res.end()
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});