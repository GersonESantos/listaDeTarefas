document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores inseridos
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');
    const userNameDisplay = document.getElementById('user-name');

    // Faz a requisição ao servidor para verificar o login
    fetch(`http://localhost:3000/login?email=${encodeURIComponent(email)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data || data.length === 0) {
            message.style.color = "red";
            message.textContent = "Email não encontrado.";
            userNameDisplay.textContent = "";
        } else {
            const user = data[0];
            if (user.passwrd === password) {
                message.style.color = "green";
                message.textContent = "Login bem-sucedido! Bem-vindo!";
                userNameDisplay.textContent = `Nome: ${user.username}`;
            } else {
                message.style.color = "red";
                message.textContent = "Senha incorreta.";
                userNameDisplay.textContent = "";
            }
        }
    })
    .catch(error => {
        console.log('Erro na requisição de login:', error);
        message.style.color = "red";
        message.textContent = "Erro ao conectar ao servidor.";
        userNameDisplay.textContent = "";
    });
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