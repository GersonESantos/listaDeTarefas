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
    localStorage.setItem('tasks', JSON.stringify(tasks));
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

window.editTask = (index) => { 
    const newTask = prompt('Digite a nova tarefa', tasks[index]);
    if (newTask.trim() !== '') {
        tasks[index] = newTask.trim();
        renderTasks();
    }
};

// Remove uma tarefa

window.deleteTask = (index) =>  {
    
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        tasks.splice(index, 1);
        renderTasks();
    }
};
renderTasks();

});
