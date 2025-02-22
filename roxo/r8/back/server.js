const express = require('express');
const mysql = require('mysql2');
// opcoes de conexao com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gabibi89*',
    database: 'bd_tasks'
});

const app = new express();

app.get("/", (req, res) => {
    connection.query("SELECT COUNT(*) users FROM users", (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.send('users' + results[0].users);
    })
});




app.listen(8080, () => {
    console.log('Rodando app listening at http://localhost:8080');
  });