document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores inseridos
    const email = document.getElementById('email').value;
    const passwrd = document.getElementById('passwrd').value;
    const message = document.getElementById('message');
    const userNameDisplay = document.getElementById('user-name');
    const logoutBtn = document.getElementById('logout-btn');
    const tasksSection = document.getElementById('tasks-section');

    // Faz a requisição ao servidor para verificar o login
    fetch(`http://localhost:3000/login?email=${encodeURIComponent(email)}&passwrd=${encodeURIComponent(passwrd)}`)
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
            logoutBtn.style.display = "none";
            tasksSection.style.display = "none";
        } else {
            const user = data[0];
            if (user.passwrd === passwrd) {
                message.style.color = "green";
                message.textContent = "Login bem-sucedido! Bem-vindo!";
                userNameDisplay.textContent = `Nome: ${user.username}`;
                logoutBtn.style.display = "block";
                tasksSection.style.display = "block"; // Mostra a seção de tarefas
                getUserTasks(user.id); // Busca as tarefas do usuário
            } else {
                message.style.color = "red";
                message.textContent = "Senha incorreta.";
                userNameDisplay.textContent = "";
                logoutBtn.style.display = "none";
                tasksSection.style.display = "none";
            }
        }
    })
    .catch(error => {
        console.log('Erro na requisição de login:', error);
        message.style.color = "red";
        message.textContent = "Erro ao conectar ao servidor.";
        userNameDisplay.textContent = "";
        logoutBtn.style.display = "none";
        tasksSection.style.display = "none";
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

// Evento para logout
document.getElementById('logout-btn').addEventListener('click', function() {
    document.getElementById('login-form').reset();
    document.getElementById('message').textContent = "";
    document.getElementById('user-name').textContent = "";
    document.getElementById('tasks-section').style.display = "none";
    this.style.display = "none";
});

// Função para buscar as tarefas do usuário
function getUserTasks(id) {
    fetch(`http://localhost:3000/user/${id}/tasks`)
    .then(response => {
        if (!response.ok) {
            console.log(`Erro ${response.status} ao buscar tarefas!`);
            throw new Error(`Status: ${response.status}`);
        }
        return response.json();
    })
    .then(tasks => {
        const tasksList = document.getElementById('tasks-list');
        if (!tasks || tasks.length === 0) {
            tasksList.innerHTML = "<p>Nenhuma tarefa encontrada para este usuário.</p>";
        } else {
            tasksList.innerHTML = "";
            tasks.forEach(task => {
                const taskItem = document.createElement("div");
                taskItem.classList.add("task-item");
                taskItem.innerHTML = `
                    <strong>Tarefa #${task.id}: ${task.task_description}</strong>
                    <span>Status: ${task.status}</span>
                    <span>Criada em: ${new Date(task.created_at).toLocaleString()}</span>
                    <span>Atualizada em: ${new Date(task.updated_at).toLocaleString()}</span>
                `;
                tasksList.appendChild(taskItem);
            });
        }
    })
    .catch(error => {
        console.log('Erro na requisição de tarefas:', error);
        document.getElementById('tasks-list').innerHTML = `<p>Erro ao carregar tarefas: ${error.message}</p>`;
    });
}