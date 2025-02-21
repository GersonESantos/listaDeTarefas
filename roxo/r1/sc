document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';     
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span> 
                <div>
                    <button class="edit-btn" onclick="editTask(${index})">Editar</button>
                    <button class="delete-btn" onClick="deleteTask(${index})">Remover</button>             
                </div>
                `;      
            taskList.appendChild(li);
        });
        saveTasks();
    }

    // Salva as tarefas no localStorage
    function saveTasks() {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (e) {
            console.error('Erro ao salvar tarefas no localStorage', e);
        }
    }

    // Adiciona uma nova tarefa
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (taskInput.value.trim()) {
            tasks.push(taskInput.value.trim());
            taskInput.value = '';
            renderTasks();
        }
    });

    // Edita uma tarefa
    window.editTask = function(index) {
        const newTask = prompt('Edite a tarefa:', tasks[index]);
        if (newTask !== null && newTask.trim()) {
            tasks[index] = newTask.trim();
            renderTasks();
        }
    };

    // Remove uma tarefa
    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        renderTasks();
    };

    renderTasks();
});