# listaDeTarefas

# LISTA DE TAREFAS

Uma aplicação frontend com HTML, CSS e JS puro para gerir tarefas.
No backend vamos ter uma API NodeJS + Express + MySQL para servir o frontend.

# BASE DE DADOS

    users
        id
        username
        passwrd
        created_at
        updated_at

    tasks
        id
        id_user
        task_text
        task_status(new | in progress | canceled | done)
        created_at
        updated_at

# TAREFAS A DESENVOLVER NO PROJETO

    > criar a estrutura inicial
        - base do frontend (html css js | bootstrap)
        - base do backend (node + express + mysql) com uma resposta padrão

    > no frontend
        - páginas necessárias para a navegação na nossa app.
        - pequenos testes de comunicação entre front e backend - utilização de Ajax (XMLhttprequest | fetch API)

    > no backend
       - criar o servidor NodeJS + express + sql + nodemon
       - instar npm init npm i express sql2 nodemon 
       - Criar um endpoint inicial e testar comunicação
    
    
    - estrutura base de cada página
        bootstrap (slate) bootswatch
        fontawesome
    
    - ver tarefas
        titulo
        filtro para escolher que tarefas queremos ver (select)
        botao para adicionar tarefas
        (mensagem sobre o facto de não existirem tarefas)
        
        caixa para tarefas
            - possibilidade de alterar o status, editar tarefa e eliminar tarefa
        parágrafo com o total de tarefas disponíveis (de acordo com o filtro)

    - adicionar tarefa
        input:text com o texto da tarefa
        botão para cancelar
        botão para submeter tarefa

    - editar tarefa
        input:text para editar o texto da tarefa
        botão para cancelar
        botão para submeter alteração

    (eliminar será feito com uma modal)

    meu-projeto/

    
├── client/                 # Tudo relacionado ao front-end
│   ├── assets/            # Arquivos estáticos (imagens, fontes, etc.)
│   │   ├── fontawesome/   # Biblioteca Font Awesome
│   │   │   └── all.min.css
│   │   └── img/           # (Opcional) Imagens, se precisar
│   ├── css/              # Estilos CSS
│   │   └── style.css
│   ├── js/               # Scripts JavaScript
│   │   ├── index.js      # Para o projeto original (usuários e tarefas)
│   │   └── script.js     # Para o programa de login
│   ├── login.html        # Página de login
│   └── index.html        # Página de exibição de usuários e tarefas
├── server/                # Tudo relacionado ao back-end
│   ├── server.js         # Arquivo principal do servidor
│   └── package.json      # Dependências do Node.js (express, mysql2, cors)
├── db/                   # (Opcional) Scripts SQL ou configurações do banco
│   ├── create_tables.sql # Criação das tabelas (users, tasks)
│   └── seed_data.sql     # Dados iniciais de teste
└── README.md             # Documentação do projeto
 
## Explicação da Estrutura

A estrutura de pastas deste projeto foi projetada para manter o código organizado, separar responsabilidades entre front-end e back-end, e facilitar a escalabilidade. Veja a descrição de cada pasta:

- **`client/`**  
  Contém todos os arquivos relacionados ao front-end (interface do usuário).  
  - **`assets/`**: Armazena recursos estáticos, como bibliotecas externas e imagens.  
    - **`fontawesome/`**: Contém o arquivo `all.min.css` do Font Awesome para ícones.  
    - **`img/`**: (Opcional) Pasta para imagens, se necessário.  
  - **`css/`**: Arquivos de estilo, como `style.css`, usados para estilizar as páginas.  
  - **`js/`**: Scripts JavaScript, separados por funcionalidade.  
    - **`index.js`**: Lógica para exibir dados de usuários e tarefas.  
    - **`script.js`**: Lógica do formulário de login.  
  - **`login.html`**: Página de login do sistema.  
  - **`index.html`**: Página para exibir dados do usuário e suas tarefas.

- **`server/`**  
  Contém o código do back-end (servidor Node.js).  
  - **`server.js`**: Arquivo principal do servidor Express com as rotas da API (`/login`, `/user/:id`, `/user/:id/tasks/`).  
  - **`package.json`**: Lista as dependências do projeto (ex.: `express`, `mysql2`, `cors`) e scripts para execução.

- **`db/`** (Opcional)  
  Scripts relacionados ao banco de dados MySQL.  
  - **`create_tables.sql`**: Contém os comandos `CREATE TABLE` para criar as tabelas `users` e `tasks`.  
  - **`seed_data.sql`**: Dados iniciais de teste (ex.: usuários e tarefas de exemplo).

- **`README.md`**  
  Arquivo na raiz do projeto com instruções de configuração, instalação e uso.