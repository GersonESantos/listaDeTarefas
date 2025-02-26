
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

    FEITO > criar a estrutura inicial
    FEITO - base do frontend (html css js | bootstrap)
    FEITO - base do backend (node + express + mysql) com uma resposta padrão

    FEITO > no frontend
    FEITO - páginas necessárias para a navegação na nossa app.
        - pequenos testes de comunicação entre front e backend - utilização de Ajax (XMLhttprequest | fetch API)


    Backend
    criar uma servidor NodeJS + Express + MySQL
    criar um endpoint inicial - testar comunicações

    (eliminar será feito com uma modal)