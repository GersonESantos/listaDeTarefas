document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Valores fixos para simular autenticação
    const validEmail = "teste@example.com";
    const validPassword = "123456";
    const userName = "Usuário Teste"; // Nome simulado

    // Captura os valores inseridos
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');
    const userNameDisplay = document.getElementById('user-name');

    // Verifica se email e senha estão corretos
    if (email === validEmail && password === validPassword) {
        message.style.color = "green";
        message.textContent = "Login bem-sucedido! Bem-vindo!";
        userNameDisplay.textContent = `Nome: ${userName}`; // Exibe o nome
    } else {
        message.style.color = "red";
        message.textContent = "Email ou senha incorretos. Tente novamente.";
        userNameDisplay.textContent = ""; // Limpa o nome em caso de erro
    }
});

// Mostrar/esconder senha ao clicar e segurar o ícone
const passwordInput = document.getElementById('password');
const togglePassword = document.querySelector('.toggle-password');

togglePassword.addEventListener('mousedown', function() {
    passwordInput.type = 'text';
    this.classList.remove('fa-eye-slash');
    this.classList.add('fa-eye');
});

togglePassword.addEventListener('mouseup', function() {
    passwordInput.type = 'password';
    this.classList.remove('fa-eye');
    this.classList.add('fa-eye-slash');
});

togglePassword.addEventListener('mouseleave', function() {
    passwordInput.type = 'password';
    this.classList.remove('fa-eye');
    this.classList.add('fa-eye-slash');
});