const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Lista de Tarefas',
      version: '1.0.0',
      description: 'API para gerenciamento de usuários e tarefas',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: ['./server.js'], // Caminho para os arquivos que contêm as anotações OpenAPI
};

const specs = swaggerJsdoc(swaggerOptions);

// Opções de conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gabibi89*',
    database: 'bd_tasks'
});

const app = express();

app.use(cors());
app.use(express.json());

// Configuração do Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Verifica conexão com MySQL
 *     tags: [Sistema]
 *     responses:
 *       200:
 *         description: Conexão com MySQL bem-sucedida
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: MySQL connection OK.
 *       500:
 *         description: Erro de conexão com MySQL
 */
app.get("/", (req, res) => {
    connection.query("SELECT COUNT(*) users FROM users", (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.send('MySQL connection OK.');
    })
});

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do usuário
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da tarefa
 *         id_user:
 *           type: integer
 *           description: ID do usuário proprietário da tarefa
 *         title:
 *           type: string
 *           description: Título da tarefa
 *         description:
 *           type: string
 *           description: Descrição da tarefa
 *         completed:
 *           type: boolean
 *           description: Status de conclusão da tarefa
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro de conexão com MySQL
 */
app.get("/user", (req, res) => {
    connection.query("SELECT * FROM users", (err, results) => {
        if (err) {
            res.status(500).send('MySQL connection error.');
        } else {
            res.json(results);
        }
    });
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro de conexão com MySQL
 */
app.get("/user/:id", (req, res) => {
    connection.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.json(results);
    })
});

/**
 * @swagger
 * /user/{id}/tasks:
 *   get:
 *     summary: Lista todas as tarefas de um usuário
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de tarefas do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Erro de conexão com MySQL
 */
app.get("/user/:id/tasks/", (req, res) => {
    connection.query("SELECT * FROM tasks WHERE id_user = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.json(results);
    })
});

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Faz login do usuário por email
 *     tags: [Autenticação]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email do usuário para login
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro de conexão com MySQL
 */
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
    console.log('🚀Rodando server/r79 listening at http://localhost:3000');
    console.log('📚 Documentação Swagger disponível em http://localhost:3000/api-docs');
});