function mostrarTalleres(tipo, inicio, fin) {
    console.log("Mostrando talleres de:", tipo);

    let titulo = document.getElementById("tituloTaller");
    let lista = document.getElementById("listaTalleres");
    let seccion = document.querySelector(".talleres-panel");

    titulo.innerText = "Talleres de " + tipo.charAt(0).toUpperCase() + tipo.slice(1);
    lista.innerHTML = "";

    for (let i = inicio; i <= fin; i++) {
        let taller = document.createElement("div");
        taller.className = "taller-list";
        taller.innerText = "Taller " + i;
        lista.appendChild(taller);
    }

    seccion.classList.remove("hidden");
}

// Mostrar formularios de registro y envío
function mostrarFormulario(tipo) {
    document.getElementById("formularioRegistrar").classList.add("hidden");
    document.getElementById("formularioEnviar").classList.add("hidden");

    if (tipo === "registrar") {
        document.getElementById("formularioRegistrar").classList.remove("hidden");
    } else if (tipo === "enviar") {
        document.getElementById("formularioEnviar").classList.remove("hidden");
    }
}

// Registrar nuevo producto
function registrarProducto() {
    let referencia = document.getElementById("referencia").value;
    let cantidad = document.getElementById("cantidad").value;
    let responsable = document.getElementById("responsable").value;
    let fecha = new Date().toLocaleDateString();

    let listaProductos = document.getElementById("listaProductos");
    let fila = `<tr><td>${fecha}</td><td>${referencia}</td><td>Actual</td><td>${cantidad}</td></tr>`;
    listaProductos.innerHTML += fila;

    alert("Producto registrado correctamente.");
}

// Enviar producto a otro taller
function enviarProducto() {
    let tallerDestino = document.getElementById("tallerDestino").value;
    let referencia = document.getElementById("referenciaEnviar").value;
    let cantidad = document.getElementById("cantidadEnviar").value;

    alert("Producto enviado a " + tallerDestino);
}
function volverAtras() {
    window.history.back();
}
