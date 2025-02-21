const express = require('express');
const mysql = require("mysql2");
const cors = require('cors');

// opcoes de conexao com o MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gabibi89*",
  database: "bd_tasks"
});
const app = new express();

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

connection.connect(err => {
  if (err) throw err;
  console.log("Banco de dados conectado!");
});

app.use(cors());
// rotas
// ----------------------------------------
app.get("/", (req, res) => {

  connection.query("SELECT COUNT(*) users FROM users", (err, results) => {
      if(err){
          res.send('MySQL connection error.');
      }
      res.send('MySQL connection OK.');
  })
});
 
// ----------------------------------------
app.get("/user/:id", (req, res) => {
    connection.query("SELECT id, username, created_at FROM users WHERE id = ?", [req.params.id] ,(err, results) => {
        if(err){
            res.send('MySQL connection error.');
        }
        res.json(results);
    })
});