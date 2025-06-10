function mostrarSeccion(seccion) {
    // Ocultar todas las secciones
    let todasLasSecciones = document.querySelectorAll('.section');
    todasLasSecciones.forEach(sec => sec.classList.add('hidden'));

    // Mostrar la sección seleccionada
    let seccionMostrar = document.getElementById(seccion);
    if (seccionMostrar) {
        seccionMostrar.classList.remove('hidden');
        cargarResumen(seccion); // Cargar datos del resumen
    } else {
        console.error("Sección no encontrada:", seccion);
    }
}

function cargarResumen(seccion) {
    fetch("https://script.google.com/macros/s/ID_DEL_SCRIPT/exec?taller=" + seccion)
        .then(response => response.json())
        .then(data => {
            let resumenDiv = document.getElementById("resumen" + seccion);
            if (resumenDiv) {
                resumenDiv.innerHTML = "";
                data.forEach(item => {
                    resumenDiv.innerHTML += `<p><strong>${item.referencia}</strong> - ${item.fecha} - ${item.responsable} - ${item.docenas} docenas</p>`;
                });
            } else {
                console.error("Elemento de resumen no encontrado:", "resumen" + seccion);
            }
        })
        .catch(error => console.error("Error al cargar resumen:", error));
}

function registrarDatos(seccion) {
    let referencia = document.getElementById("referencia" + seccion).value;
    let cantidad = document.getElementById("cantidad" + seccion).value;
    let responsable = document.getElementById("responsable" + seccion).value;

    let datos = {
        taller: seccion,
        referencia: referencia,
        cantidad: cantidad,
        responsable: responsable
    };

    fetch("https://script.google.com/macros/s/ID_DEL_SCRIPT/exec", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.text())
    .then(data => alert("Registro guardado en " + seccion))
    .catch(error => console.error("Error al registrar datos:", error));
}

function enviarATaller(seccion) {
    let tallerDestino = document.getElementById("taller" + seccion).value;
    let referencia = document.getElementById("referencia" + seccion).value;
    let cantidad = document.getElementById("cantidad" + seccion).value;
    let responsable = document.getElementById("responsable" + seccion).value;

    let datos = {
        taller: tallerDestino,
        referencia: referencia,
        cantidad: cantidad,
        responsable: responsable
    };

    fetch("https://script.google.com/macros/s/ID_DEL_SCRIPT/exec", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.text())
    .then(data => alert("Enviado a " + tallerDestino))
    .catch(error => console.error("Error al enviar datos:", error));
}
