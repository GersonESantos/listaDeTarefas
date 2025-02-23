let id = 1;

window.onload = () => {
    getUserData(id);
    getUserTasks(id);
};

// Função para buscar os dados do usuário
function getUserData(id) {
    fetch(`http://localhost:3000/user/${id}`)
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            console.log(`Erro ${response.status} ao buscar usuário!`);
            throw new Error(`Status: ${response.status}`);
        }
    })
    .then(dados => {
        if (!dados || dados.length === 0) {
            console.log('Nenhum usuário encontrado!');
            document.querySelector(".user-data").innerHTML = "<p>Nenhum usuário encontrado.</p>";
        } else {
            document.querySelector("#id").textContent = dados[0].id;
            document.querySelector("#username").textContent = dados[0].username;
            document.querySelector("#passwrd").textContent = dados[0].passwrd;
            document.querySelector("#email").textContent = dados[0].email; // Novo campo
            document.querySelector("#created_at").textContent = new Date(dados[0].created_at).toLocaleString();
            document.querySelector("#updated_at").textContent = new Date(dados[0].updated_at).toLocaleString();
        }
    })
    .catch(error => {
        console.log('Erro na requisição de usuário:', error);
        document.querySelector(".user-data").innerHTML = "<p>Erro ao carregar dados do usuário.</p>";
    });
}

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
        const tasksList = document.querySelector("#tasks-list");
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
        document.querySelector("#tasks-list").innerHTML = `<p>Erro ao carregar tarefas: ${error.message}</p>`;
    });
}