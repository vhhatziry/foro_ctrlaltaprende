// Variable para simular si el usuario ha iniciado sesión
let isLoggedIn = false; // Cambia a true para simular un inicio de sesión.

// Función para actualizar la interfaz de usuario
function updateInterface() {
    const loginContainer = document.querySelector(".button-container");
    const addTopicButton = document.querySelector(".new-topic-btn");

    if (isLoggedIn) {
        // Reemplazar botones de inicio/registro por saludo y botón de cierre de sesión
        loginContainer.innerHTML = `
            <div class="user-info">
                <p>Bienvenido, Usuario!</p>
                <button class="logout-btn">Cerrar sesión</button>
            </div>
        `;
        addTopicButton.style.display = "block"; // Mostrar botón de añadir tema
    } else {
        // Restaurar los botones de inicio de sesión y registro
        loginContainer.innerHTML = `
            <button class="login-btn">Iniciar sesión</button>
            <div class="separator">o</div>
            <button class="signup-btn">Registrarse</button>
        `;
        addTopicButton.style.display = "none"; // Ocultar botón de añadir tema
    }

    attachEventListeners(); // Asegurar eventos dinámicos en los botones
}

// Función para agregar eventos dinámicos a los botones
function attachEventListeners() {
    const loginButton = document.querySelector(".login-btn");
    const logoutButton = document.querySelector(".logout-btn");

    if (loginButton) {
        loginButton.addEventListener("click", () => {
            isLoggedIn = true;
            updateInterface(); // Actualizar la interfaz al iniciar sesión
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            isLoggedIn = false;
            updateInterface(); // Actualizar la interfaz al cerrar sesión
        });
    }
}

// Función para manejar los comentarios dinámicos
function setupCommentFunctionality() {
    const form = document.getElementById("comment-form");
    const commentText = document.getElementById("comment-text");
    const commentsContainer = document.querySelector(".topic-comments");
    const responsesHeader = commentsContainer.querySelector("h3");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Evitar recarga de la página

            const newComment = commentText.value.trim();
            if (newComment) {
                // Crear el nuevo comentario
                const commentDiv = document.createElement("div");
                commentDiv.classList.add("comment");
                commentDiv.innerHTML = `
                    <p><strong>${isLoggedIn ? "Usuario" : "Usuario Anónimo"}:</strong> ${newComment}</p>
                `;

                // Insertar el nuevo comentario antes del formulario
                commentsContainer.insertBefore(commentDiv, commentsContainer.querySelector(".add-comment"));

                // Actualizar el número de respuestas
                const currentResponses = commentsContainer.querySelectorAll(".comment").length;
                responsesHeader.textContent = `Respuestas (${currentResponses})`;

                // Limpiar el campo de texto
                commentText.value = "";
            } else {
                alert("Por favor, escribe un comentario antes de enviarlo.");
            }
        });
    }
}

// Inicializar todo cuando se cargue la página
document.addEventListener("DOMContentLoaded", () => {
    updateInterface(); // Configurar interfaz inicial
    setupCommentFunctionality(); // Configurar manejo de comentarios
});
