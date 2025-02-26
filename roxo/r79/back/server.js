const express = require('express');
// Importa o framework Express para criar um servidor web
const mysql = require('mysql2');
// Importa a biblioteca mysql2 para conectar e interagir com o banco de dados MySQL
const cors = require('cors');
// Importa o middleware CORS para permitir requisições de origens diferentes (ex.: frontend no navegador)

// opcoes de conexao com o MySQL
const connection = mysql.createConnection({
    host: 'localhost', // Endereço do servidor MySQL (neste caso, local)
    user: 'root',      // Nome de usuário do MySQL
    password: 'Gabibi89*', // Senha do usuário MySQL
    database: 'bd_tasks'   // Nome do banco de dados a ser utilizado
});
// Cria uma conexão com o banco de dados MySQL usando as credenciais fornecidas

const app = new express();
// Cria uma instância do aplicativo Express para configurar rotas e middlewares

app.use(cors());
// Aplica o middleware CORS a todas as rotas, permitindo que o frontend acesse o servidor

// rotas
// ----------------------------------------
// Rota raiz (GET /)
app.get("/", (req, res) => {
    // Define uma rota GET para o caminho raiz (/)
    connection.query("SELECT COUNT(*) users FROM users", (err, results) => {
        // Executa uma consulta SQL para contar o número de usuários na tabela "users"
        if (err) {
            // Se houver erro na consulta
            res.send('MySQL connection error.');
            // Envia uma mensagem de erro como resposta
        }
        res.send('MySQL connection OK.');
        // Caso contrário, envia uma mensagem de sucesso (apenas para teste de conexão)
    });
});

// ----------------------------------------
// Rota para buscar usuário por ID (GET /user/:id)
app.get("/user/:id", (req, res) => {
    // Define uma rota GET com parâmetro dinâmico ":id"
    connection.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, results) => {
        // Executa uma consulta SQL para buscar um usuário pelo ID fornecido na URL
        // O "?" é um placeholder substituído pelo valor de req.params.id para evitar SQL injection
        if (err) {
            // Se houver erro na consulta
            res.send('MySQL connection error.');
            // Envia uma mensagem de erro
        }
        res.json(results);
        // Envia os resultados da consulta como JSON
    });
});

// ----------------------------------------
// Rota para buscar tarefas de um usuário por ID (GET /user/:id/tasks/)
app.get("/user/:id/tasks/", (req, res) => {
    // Define uma rota GET com parâmetro dinâmico ":id" para buscar tarefas
    connection.query("SELECT * FROM tasks WHERE id_user = ?", [req.params.id], (err, results) => {
        // Executa uma consulta SQL para buscar tarefas associadas ao ID do usuário
        if (err) {
            // Se houver erro na consulta
            res.send('MySQL connection error.');
            // Envia uma mensagem de erro
        }
        res.json(results);
        // Envia os resultados como JSON
    });
});

// Nova rota para login por email (GET /login)
app.get("/login", (req, res) => {
    // Define uma rota GET para buscar usuário por email
    const email = req.query.email;
    // Obtém o valor do parâmetro "email" passado na query string (ex.: ?email=exemplo@dominio.com)
    connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        // Executa uma consulta SQL para buscar usuários com o email fornecido
        if (err) {
            // Se houver erro na consulta
            res.status(500).send('MySQL connection error.');
            // Envia uma resposta com status 500 (erro interno do servidor)
        } else {
            // Se a consulta for bem-sucedida
            res.json(results);
            // Envia os resultados como JSON (uma lista de usuários, mesmo que seja apenas um)
        }
    });
});

app.listen(3000, () => {
    // Inicia o servidor na porta 3000
    console.log('🚀Rodando server/r76 listening at http://localhost:3000');
    // Exibe uma mensagem no console indicando que o servidor está ativo
});