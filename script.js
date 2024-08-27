document.addEventListener('DOMContentLoaded', function () {
    const nombres = [
        "Juan", "María", "Pedro", "Luisa", "Ana", 
        "Miguel", "Sofía", "Carlos", "Daniela", "José"
    ];
    const comentarios = [
        "Excelente servicio.", "Muy satisfecho.", "Podría ser bastante mejor.",
        "Increíble experiencia.", "No volvería a usarlo.", "Recomendado.",
        "Súper práctico y útil.", "Fue un poco lento, pero genial servicio", "Me encantó.",
        "Excelente experiencia"
    ];

    function obtenerAleatorios(arr, cantidad) {
        let resultado = [];
        let indicesUsados = [];
        while (resultado.length < cantidad) {
            let indice = Math.floor(Math.random() * arr.length);
            if (!indicesUsados.includes(indice)) {
                indicesUsados.push(indice);
                resultado.push(arr[indice]);
            }
        }
        return resultado;
    }

    const nombresSeleccionados = obtenerAleatorios(nombres, 3);
    const comentariosSeleccionados = obtenerAleatorios(comentarios, 3);

    const comentariosContainer = document.getElementById('comentarios-container');
    comentariosSeleccionados.forEach((comentario, index) => {
        const comentarioDiv = document.createElement('div');
        comentarioDiv.classList.add('alert', 'alert-info');
        comentarioDiv.innerText = `${nombresSeleccionados[index]} dice: "${comentario}"`;
        comentariosContainer.appendChild(comentarioDiv);
    });

    // Validación del formulario y mostrar modal de confirmación
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (contactForm.checkValidity()) {
            $('#confirmationModal').modal('show');

            console.log("Nombre:", document.getElementById('nombre').value);
            console.log("Fecha de Nacimiento:", document.getElementById('fechaNacimiento').value);
            console.log("Correo Electrónico:", document.getElementById('email').value);
            console.log("Mensaje:", document.getElementById('mensaje').value);

            contactForm.reset();

        } else {
            event.stopPropagation();
        }
        contactForm.classList.add('was-validated');
    });
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenir el envío del formulario para manejo de errores

    // Reiniciar mensajes de error y estilos    
    resetFormErrors();

    let hasError = false;

    // Validar nombre
    const name = document.getElementById('nombre').value.trim();
    if (name === '') {
        showError('name', 'El nombre es obligatorio.');
        hasError = true;
    }

    // Validar fecha de nacimiento
    const dob = document.getElementById('fechaNacimiento').value.trim();
    if (dob === '') {
        showError('dob', 'La fecha de nacimiento es obligatoria.');
        hasError = true;
    }

    // Validar correo electrónico
    const email = document.getElementById('email').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        showError('email', 'El correo electrónico es obligatorio.');
        hasError = true;
    } else if (!emailPattern.test(email)) {
        showError('email', 'El formato del correo electrónico no es válido.');
        hasError = true;
    }

    // Validar mensaje
    const message = document.getElementById('mensaje').value.trim();
    if (message === '') {
        showError('message', 'El mensaje es obligatorio.');
        hasError = true;
    }

    // Si no hay errores, mostrar modal de confirmación y ejecutar método adicional
    if (!hasError) {
        // Mostrar modal de confirmación
        const myModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        myModal.show();

        // Mostrar datos en la consola
        console.log('Nombre:', name);
        console.log('Fecha de Nacimiento:', dob);
        console.log('Correo Electrónico:', email);
        console.log('Mensaje:', message);

        // Ejecutar el método adicional después del envío del formulario
        postSubmitMethod();

        // Limpiar el formulario después de enviar
        document.getElementById('contactForm').reset();
        resetFormErrors(); // Reiniciar mensajes de error y estilos
    }
});

// Función para mostrar mensajes de error
function showError(fieldId, message) {
    document.getElementById(`${fieldId}-error`).innerText = message;
    document.getElementById(`${fieldId}-error`).style.display = 'block';
    document.getElementById(fieldId).classList.add('is-invalid');
}

// Función para reiniciar mensajes de error y estilos
function resetFormErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(function (element) {
        element.style.display = 'none';
    });

    const inputElements = document.querySelectorAll('.form-control');
    inputElements.forEach(function (element) {
        element.classList.remove('is-invalid');
    });
}

// Método adicional a ejecutar después del envío del formulario
function postSubmitMethod() {
    console.log('');
}


function reloads(){
    location.reload();
}
