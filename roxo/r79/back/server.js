const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

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

// ...existing code...

// Rota para listar todos os usuários
app.get("/user", (req, res) => {
    connection.query("SELECT * FROM users", (err, results) => {
        if (err) {
            res.status(500).send('MySQL connection error.');
        } else {
            res.json(results);
        }
    });
});

// ...existing code...

// ----------------------------------------
app.get("/user/:id", (req, res) => {
    connection.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, results) => {
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
// Nova rota para login por email
app.get("/login", (req, res) => {
    const email = req.query.email;
    connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) {
            res.status(500).send('MySQL connection error.');
        } else {
            res.json(results);
        }
    });
});

app.listen(3000, () => {
    console.log('🚀Rodando server/r76 listening at http://localhost:3000');
  });