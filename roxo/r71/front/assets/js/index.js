let id = 1;

window.onload = () => {
    get_username(id);
};

// ---------------------------------------------------
function get_username(id) {
    fetch(`http://localhost:3000/user/${id}`)
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            console.log('ERRO!');
        }
    })
    .then(dados => {
        if (dados.length === 0) {
            console.log('Erro!');
        } else {
            // Preenche todos os campos com os dados retornados
            document.querySelector("#id").textContent = dados[0].id;
            document.querySelector("#username").textContent = dados[0].username;
            document.querySelector("#email").textContent = dados[0].email;
            document.querySelector("#passwrd").textContent = dados[0].passwrd;
            document.querySelector("#created_at").textContent = new Date(dados[0].created_at).toLocaleString();
            document.querySelector("#updated_at").textContent = new Date(dados[0].updated_at).toLocaleString();
        }
    })
    .catch(error => {
        console.log('Erro na requisição:', error);
    });
}