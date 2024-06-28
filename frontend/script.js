document.getElementById('register-form').addEventListener('submit', function(event) {


    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    fetch('http://localhost:5000/user/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.user_id) {
            alert(`Usuario registrado: ${data.name} (${data.email}) (${data.message})` );
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';  
        } else {
            alert('Error al registrar usuario');

        }
    })
    .catch(error => console.error('Error:', error));
    console.log(JSON.stringify({ name, email, message }));

});


function getUser() {
    const user_id = document.getElementById('userId').value;
    if (user_id) {
        fetch(`http://localhost:5000/user/${user_id}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Usuario no encontrado');
            } else {
                alert(`Detalles del usuario:\nID: ${data.user_id}\nNombre: ${data.name}\nEmail: ${data.email} \nMensaje: ${data.message}`);
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Por favor, ingrese un ID de usuario válido.');
    }
}

function updateUser(){
    const user_id = document.getElementById('userId').value;
    if (user_id) {
        const name = prompt('Ingrese el nuevo nombre:');
        const email = prompt('Ingrese el nuevo email:');
        const message = prompt('Ingrese el nuevo mensaje:');
        if (name && email && message) {
            fetch(`http://localhost:5000/user/${user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Usuario no encontrado');
                } else {
                    alert(`Usuario actualizado:\nNombre: ${data.name}\nEmail: ${data.email}\nMensaje: ${data.message}`);
                }
            })
            .catch(error => console.error('Error:', error));
        } else {
            alert('Debe ingresar nombre y email válidos.');
        }
    } else {
        alert('Por favor, ingrese un ID de usuario válido.');
    }
}

function deleteUser() {
    const user_id = document.getElementById('userId').value;
    if (user_id) {
        fetch(`http://localhost:5000/user/${user_id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Usuario eliminado correctamente');
            } else {
                alert('Error al eliminar usuario');
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Por favor, ingrese un ID de usuario válido.');
    }
}
