document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const passwrd = document.getElementById('passwrd').value;
    const userNameDisplay = document.getElementById('user-name');
    const userPasswrdDisplay = document.getElementById('user-passwrd');
    const message = document.getElementById('message');

    fetch(`http://localhost:3000/login?email=${encodeURIComponent(email)}&passwrd=${encodeURIComponent(passwrd)}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                userNameDisplay.textContent = `Usuário: ${data[0].username}`;
                userPasswrdDisplay.textContent = `Senha: ${data[0].passwrd}`;
                message.textContent = "Login bem-sucedido!";
                message.style.color = "green";
            } else {
                userNameDisplay.textContent = "";
                userPasswrdDisplay.textContent = "";
                message.textContent = "Usuário não encontrado ou senha incorreta.";
                message.style.color = "red";
            }
        })
        .catch(error => {
            userNameDisplay.textContent = "";
            userPasswrdDisplay.textContent = "";
            message.textContent = "Erro ao buscar usuário.";
            message.style.color = "red";
        });
});