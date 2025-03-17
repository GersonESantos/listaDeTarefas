const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gabibi89*',
    database: 'bd_tasks'
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    connection.query("SELECT COUNT(*) users FROM users", (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.send('MySQL connection OK.');
    });
});

app.get("/user/:id", (req, res) => {
    connection.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.json(results);
    });
});

app.get("/user/:id/tasks/", (req, res) => {
    connection.query("SELECT * FROM tasks WHERE id_user = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.json(results);
    });
});

// Rota de login ajustada para usar 'passwd'
app.get("/login", (req, res) => {
    const { email, password } = req.query; // 'password' vem do front-end
    connection.query(
        "SELECT * FROM users WHERE email = ? AND passwrd = ?", // Mudado de 'password' para 'passwd'
        [email, password],
        (err, results) => {
            if (err) {
                res.status(500).send('MySQL connection error.');
            } else if (results.length > 0) {
                res.json(results);
            } else {
                res.status(401).send('Email ou senha inválidos.');
            }
        }
    );
});

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
    console.log('🚀 Rodando server/r83 listening at http://localhost:3000');
});