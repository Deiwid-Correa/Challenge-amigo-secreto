let amigos = [];
let resultados = [];
let indiceSorteo = 0; // Para llevar el control de qué usuario está realizando el sorteo
const maxNombres = 60; // Límite máximo de amigos

// Función para agregar un amigo a la lista
function agregarAmigo() {
    let amigoInput = document.getElementById("amigo").value.trim();
    
    // Validación para evitar agregar más de 60 nombres
    if (amigos.length >= maxNombres) {
        alert("Ya has alcanzado el límite máximo de 60 amigos.");
        return;
    }
    
    // Validación para que no se agreguen nombres vacíos o repetidos
    if (amigoInput && !amigos.includes(amigoInput)) {
        amigos.push(amigoInput); // Agregar el nombre al array
        document.getElementById("amigo").value = ""; // Limpiar el campo de texto
        actualizarListaAmigos(); // Actualizar la lista mostrada en la página
    } else if (!amigoInput) {
        alert("Por favor, ingrese un nombre.");
    } else {
        alert("Este nombre ya está en la lista.");
    }
}

// Función para actualizar la lista de amigos en el HTML
function actualizarListaAmigos() {
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = ""; // Limpiar la lista actual

    amigos.forEach(amigo => {
        let li = document.createElement("li");
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

// Función para realizar el sorteo de amigo secreto
function sortearAmigo() {
    // Si ya se realizó el sorteo para todos los amigos, evitar hacer más sorteos
    if (indiceSorteo >= amigos.length) {
        alert("¡El sorteo ha finalizado para todos!");
        return;
    }

    if (resultados.length === 0) {
        // Si no hay resultados, realizar el sorteo completo una sola vez
        let copiaAmigos = [...amigos];
        
        // Realizar el sorteo para todos los amigos y asignarles un amigo secreto
        for (let i = 0; i < amigos.length; i++) {
            let amigoSecreto;
            
            // Evitar que la persona se asigne a sí misma como amigo secreto
            do {
                let index = Math.floor(Math.random() * copiaAmigos.length);
                amigoSecreto = copiaAmigos.splice(index, 1)[0]; // Eliminar el amigo secreto de la copia
            } while (amigoSecreto === amigos[i]); // Repetir si el amigo secreto es el mismo que la persona

            // Agregar el resultado final
            resultados.push({ nombre: amigos[i], amigoSecreto });
        }
    }

    // Mostrar el resultado de la persona que está haciendo el sorteo
    let amigoActual = resultados[indiceSorteo];
    mostrarResultado(amigoActual);

    // Aumentar el índice para el siguiente sorteo
    indiceSorteo++;
}

// Función para mostrar el resultado del sorteo de un solo amigo
function mostrarResultado(amigoActual) {
    const listaResultados = document.getElementById("resultado");
    listaResultados.innerHTML = ""; // Limpiar resultados previos

    // Mostrar solo el amigo secreto para el participante actual
    let li = document.createElement("li");
    li.textContent = `${amigoActual.nombre}, tu amigo secreto es ${amigoActual.amigoSecreto}!`;
    listaResultados.appendChild(li);

    // Eliminar al participante actual de la lista de amigos para que no salga de nuevo
    amigos = amigos.filter(nombre => nombre !== amigoActual.nombre);
    actualizarListaAmigos();
}
