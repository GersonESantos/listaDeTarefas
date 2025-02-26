document.getElementById('email-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura o email inserido
    const email = document.getElementById('email').value;
    const message = document.getElementById('message');
    const userNameDisplay = document.getElementById('user-name');

    // Faz a requisição ao servidor usando a rota /login
    fetch(`http://localhost:3000/login?email=${encodeURIComponent(email)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                message.style.color = "red";
                message.textContent = "Email não encontrado.";
                userNameDisplay.textContent = "";
            } else {
                const user = data[0]; // Pega o primeiro resultado
                message.style.color = "green";
                message.textContent = "Usuário encontrado!";
                userNameDisplay.textContent = `Nome: ${user.username}`;
            }
        })
        .catch(error => {
            console.log('Erro na requisição:', error);
            message.style.color = "red";
            message.textContent = "Erro ao conectar ao servidor.";
            userNameDisplay.textContent = "";
        });
});