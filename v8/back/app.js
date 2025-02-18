const express = require('express');
const mysql = require("mysql2");
const app = express();


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gabibi89*",
  database: "projeto"
});

db.connect(err => {
  if (err) throw err;
  console.log("Banco de dados conectado!");
});

// app.get('/', (req, res) => {
//   res.write('Ola! digite http://localhost:3000/clientes para ver os clientes');
//   res.end()
// });

app.get("/", (req, res) => {
  db.query("SELECT * FROM cliente", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});