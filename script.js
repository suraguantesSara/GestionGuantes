const PASSWORD = "admin123"; // Cambia esto por la contraseña real

function mostrarLogin() {
    document.getElementById("loginForm").classList.remove("hidden");
}

function validarAcceso() {
    let inputPass = document.getElementById("password").value;
    if (inputPass === PASSWORD) {
        window.location.href = "admin.html"; // Redirige a la segunda interfaz
    } else {
        alert("Contraseña incorrecta");
    }
}

function verInventario() {
    window.location.href = "inventario.html"; // Redirige a la vista de inventario
}
