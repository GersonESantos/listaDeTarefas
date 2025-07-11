# API de Lista de Usuários e Tarefas

Este projeto é uma API simples construída com Node.js e Express para gerenciar usuários e suas tarefas, utilizando um banco de dados MySQL.

## Funcionalidades

- Conectar a um banco de dados MySQL.
- Listar todos os usuários.
- Buscar um usuário específico por ID.
- Buscar tarefas de um usuário específico por ID.
- Realizar login de usuário por email.
- Verificar o status da conexão com o banco de dados.

## Tecnologias Utilizadas

- **Node.js:** Ambiente de execução JavaScript no servidor.
- **Express.js:** Framework para construir APIs web.
- **mysql2:** Driver MySQL para Node.js.
- **cors:** Middleware para habilitar o Cross-Origin Resource Sharing.

## Pré-requisitos

- Node.js e npm (ou yarn) instalados.
- Um servidor MySQL em execução.
- Um banco de dados chamado `bd_tasks` com as tabelas `users` e `tasks` devidamente configuradas.

## Configuração do Banco de Dados

Certifique-se de que seu servidor MySQL esteja em execução e que você tenha um banco de dados chamado `bd_tasks`.

**Exemplo de tabelas:**

**Tabela `users`:**
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    -- outros campos relevantes para usuários
);
```

**Tabela `tasks`:**
```sql
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    description TEXT NOT NULL,
    status VARCHAR(50), -- ex: 'pendente', 'em andamento', 'concluída'
    -- outros campos relevantes para tarefas
    FOREIGN KEY (id_user) REFERENCES users(id)
);
```

## Instalação e Execução

1.  **Clone o repositório (se aplicável) ou crie a estrutura de arquivos.**
2.  **Crie o arquivo `server.js`** com o conteúdo fornecido.
3.  **Instale as dependências:**
    ```bash
    npm install express mysql2 cors
    ```
    ou
    ```bash
    yarn add express mysql2 cors
    ```
4.  **Configure as credenciais do banco de dados** no arquivo `server.js`:
    Modifique o objeto `connection` com seu host, usuário, senha e nome do banco de dados, se forem diferentes do padrão:
    ```javascript
    const connection = mysql.createConnection({
        host: 'localhost',      // Seu host MySQL
        user: 'root',           // Seu usuário MySQL
        password: 'Gabibi89*',  // Sua senha MySQL
        database: 'bd_tasks'    // Nome do banco de dados
    });
    ```
5.  **Inicie o servidor:**
    ```bash
    node server.js
    ```
    O servidor estará rodando em `http://localhost:3000`.

## Endpoints da API

A seguir estão os endpoints disponíveis na API:

-   **`GET /`**
    -   Descrição: Verifica a conexão com o MySQL e retorna a contagem de usuários ou uma mensagem de status.
    -   Resposta: `MySQL connection OK.` ou `MySQL connection error.`
-   **`GET /user`**
    -   Descrição: Lista todos os usuários cadastrados.
    -   Resposta: Um array JSON com os dados dos usuários.
-   **`GET /user/:id`**
    -   Descrição: Retorna os dados de um usuário específico com base no `id` fornecido.
    -   Resposta: Um objeto JSON com os dados do usuário.
-   **`GET /user/:id/tasks`**
    -   Descrição: Retorna todas as tarefas associadas a um usuário específico com base no `id` do usuário.
    -   Resposta: Um array JSON com as tarefas do usuário.
-   **`GET /login?email=<user_email>`**
    -   Descrição: Busca um usuário pelo `email` fornecido no query parameter.
    -   Exemplo: `http://localhost:3000/login?email=exemplo@email.com`
    -   Resposta: Um array JSON com os dados do usuário correspondente (geralmente um único usuário, se o email for único).

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.