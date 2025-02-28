document.getElementById('email-form').addEventListener('submit', function(event) {
    // Adiciona um ouvinte de evento ao formulário com ID "email-form" para o evento "submit"
    event.preventDefault(); // Impede o envio padrão do formulário
    // Evita que a página seja recarregada ao enviar o formulário, permitindo controle via JavaScript

    // Captura o email inserido
    const email = document.getElementById('email').value;
    // Obtém o valor digitado no campo com ID "email" e armazena na constante "email"
    const message = document.getElementById('message');
    // Obtém o elemento <p> com ID "message" para exibir mensagens de feedback
    const userNameDisplay = document.getElementById('user-name');
    // Obtém o elemento <p> com ID "user-name" para exibir o nome do usuário encontrado

    // Faz a requisição ao servidor usando a rota /login
    fetch(`http://localhost:3000/login?email=${encodeURIComponent(email)}`)
        // Inicia uma requisição HTTP GET para o endpoint /login no servidor local, passando o email como parâmetro de query
        // encodeURIComponent() codifica o email para evitar problemas com caracteres especiais na URL
        .then(response => {
            // Primeira promessa: processa a resposta bruta do servidor
            if (!response.ok) {
                // Verifica se a resposta não foi bem-sucedida (status diferente de 200-299)
                throw new Error(`Erro: ${response.status}`);
                // Lança um erro com o código de status HTTP (ex.: 404, 500) para ser capturado no .catch
            }
            return response.json();
            // Converte a resposta do servidor de formato JSON para um objeto JavaScript
        })
        .then(data => {
            // Segunda promessa: processa os dados convertidos do JSON
            if (!data || data.length === 0) {
                // Verifica se os dados estão vazios ou inexistentes (nenhum usuário encontrado)
                message.style.color = "red";
                // Define a cor do texto da mensagem como vermelho para indicar erro
                message.textContent = "Email não encontrado.";
                // Exibe a mensagem de erro no elemento <p id="message">
                userNameDisplay.textContent = "";
                // Limpa o campo de nome do usuário
            } else {
                // Caso os dados existam (usuário encontrado)
                const user = data[0]; // Pega o primeiro resultado
                // Assume que o servidor retorna uma lista e seleciona o primeiro item (índice 0)
                message.style.color = "green";
                // Define a cor do texto da mensagem como verde para indicar sucesso
                message.textContent = "Usuário encontrado!";
                // Exibe a mensagem de sucesso no elemento <p id="message">
                userNameDisplay.textContent = `Nome: ${user.username}`;
                // Exibe o nome do usuário no elemento <p id="user-name"> usando a propriedade "username" do objeto
            }
        })
        .catch(error => {
            // Captura qualquer erro ocorrido nas promessas anteriores (ex.: falha na rede ou erro HTTP)
            console.log('Erro na requisição:', error);
            // Registra o erro no console do navegador para depuração
            message.style.color = "red";
            // Define a cor do texto da mensagem como vermelho
            message.textContent = "Erro ao conectar ao servidor.";
            // Exibe uma mensagem de erro genérica no elemento <p id="message">
            userNameDisplay.textContent = "";
            // Limpa o campo de nome do usuário
        });
});