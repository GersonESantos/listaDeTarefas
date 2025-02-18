const express = require('express');
const mysql = require("mysql2");
const app = express();
const cors = require('cors');

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

app.use(cors());

app.get("/users", (req, res) => {
  db.query("SELECT *  FROM users id = ?",[req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});