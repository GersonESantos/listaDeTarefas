const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// opcoes de conexao com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gabibi89*',
    database: 'bd_tasks'
});

const app = new express();

app.use(cors());

// rotas
// ----------------------------------------
app.get("/", (req, res) => {
    connection.query("SELECT COUNT(*) users FROM users", (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.send('MySQL connection OK.');
    })
});

// ----------------------------------------
app.get("/user/:id", (req, res) => {
    connection.query("SELECT id, username, created_at FROM users WHERE id = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.json(results);
    })
});

// ----------------------------------------
app.get("/user/:id/tasks/", (req, res) => {
    connection.query("SELECT * FROM tasks WHERE id_user = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.json(results);
    })
});
app.listen(3000, () => {
    console.log('🚀Rodando sever.js gerson/v14 listening at http://localhost:3000');
  });