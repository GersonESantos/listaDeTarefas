// javascript do index.html

let id = 1

window.onload = () => {
    
    get_username(id);
    get_user_tasks(id);
}

// ---------------------------------------------------
function get_username(id){

    fetch(`http://localhost:3000/user/${id}`)
    .then(response => {
        if(response.status === 200){
            return response.json();
        } else {
            console.log('ERRO!');
        }
    })
    .then(dados => {
        if(dados.length === 0){
            console.log('Erro!');
        } else {
            document.querySelector("#username").textContent = dados[0].username;
        }
    })

}

// ---------------------------------------------------
function get_user_tasks(id){

    fetch(`http://localhost:3000/user/${id}/tasks`)
    .then(response => {
        if(response.status === 200){
            return response.json();
        } else {
            console.log('ERRO!');
        }
    })
    .then(tarefas => {
        if(tarefas.length === 0){
            document.querySelector("#no_tasks").classList.remove("d-none");
        } else {
            
            document.querySelector("#tasks_container").innerHTML = null;

            tarefas.forEach(tarefa => {

                let html = `
                <div class="col-12 border border-secondary rounded p-3 shadow">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <div class="d-flex align-items-center">
                                <h5 class="me-3 text-info"><i class="fa-solid fa-circle-chevron-right"></i></h5>
                                <h5>${tarefa.task_description}</h5>
                            </div>
                        </div>
                        <div class="col-2">
                            <select id="task_status" class="form-select p-2">
                                <option value="new">New</option>
                                <option value="in progress">In progress</option>
                                <option value="canceled">Canceled</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <div class="col-1 text-end"><i class="fa-regular fa-pen-to-square me-2"></i>Edit</div>
                        <div class="col-1 text-end text-danger"><i class="fa-regular fa-trash-can me-2"></i>Delete</div>
                    </div>
                </div>`;

                let new_task = document.createElement('div');
                new_task.classList.add('row', 'mb-3');
                new_task.innerHTML = html;

                document.querySelector("#tasks_container").appendChild(new_task);
            });

            document.querySelector("#no_tasks").classList.add("d-none");
            console.log(tarefas.length);
            document.querySelector("#total_tasks").textContent = tarefas.length;
            //console.log(document.querySelector("#total_tasks"))
            
        }
    })

}


/* 
            <div class="row mb-3">
                <div class="col-12 border border-secondary rounded p-3 shadow">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <div class="d-flex align-items-center">
                                <h5 class="me-3 text-info"><i class="fa-solid fa-circle-chevron-right"></i></h5>
                                <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
                            </div>
                        </div>
                        <div class="col-2">
                            <select id="task_status" class="form-select p-2">
                                <option value="new">New</option>
                                <option value="in progress">In progress</option>
                                <option value="canceled">Canceled</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <div class="col-1 text-end"><i class="fa-regular fa-pen-to-square me-2"></i>Edit</div>
                        <div class="col-1 text-end text-danger"><i class="fa-regular fa-trash-can me-2"></i>Delete</div>
                    </div>
                </div>
            </div>
*/