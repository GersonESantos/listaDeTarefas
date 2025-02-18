window.onload =()=>{
    console.log('Hello World');
}
function get_username(id)
{
    fetch('http://localhost:3000/user/${id}')
    .then(response => 
        {
        if(response.status === 200)
        {
            return response.json();
            
        }else
        {
            console.log('Failed');
        }
        })
        .then(data => {
            if(dados.length === 0)
            {
                console.log('No data');
            }else{
                document.querySelector('#username').textContent = dados[0].username;
            }
        })
};