const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Opções de conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gabibi89*',
    database: 'bd_tasks'
});

const app = express(); // Corrigido: "new express()" para "express()"

app.use(cors());
app.use(express.json()); // Adicionado para parsing de JSON nas requisições DELETE

// Rotas
// ----------------------------------------
app.get("/", (req, res) => {
    connection.query("SELECT COUNT(*) users FROM users", (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.send('MySQL connection OK.');
    });
});

// ----------------------------------------
app.get("/user/:id", (req, res) => {
    connection.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.json(results);
    });
});

// ----------------------------------------
app.get("/user/:id/tasks/", (req, res) => {
    connection.query("SELECT * FROM tasks WHERE id_user = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.json(results);
    });
});

// ----------------------------------------
// Rota para login por email
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

// ----------------------------------------
// Nova rota para excluir uma tarefa
app.delete("/tasks/:id", (req, res) => {
    const taskId = req.params.id;
    connection.query("DELETE FROM tasks WHERE id = ?", [taskId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao excluir tarefa.');
        }
        if (result.affectedRows > 0) {
            res.status(200).send('Tarefa excluída com sucesso.');
        } else {
            res.status(404).send('Tarefa não encontrada.');
        }
    });
});

app.listen(3000, () => {
    console.log('🚀 Rodando server/r81 listening at http://localhost:3000');
});