function mostrarSeccion(seccion) {
    let todasLasSecciones = document.querySelectorAll('.section');
    todasLasSecciones.forEach(sec => sec.classList.add('hidden'));

    document.getElementById(seccion).classList.remove('hidden');
    cargarResumen(seccion);
}

function cargarResumen(seccion) {
    fetch("https://script.google.com/macros/s/ID_DEL_SCRIPT/exec?taller=" + seccion)
        .then(response => response.json())
        .then(data => {
            let resumenDiv = document.getElementById("resumen" + seccion.charAt(0).toUpperCase() + seccion.slice(1));
            resumenDiv.innerHTML = "";
            data.forEach(item => {
                resumenDiv.innerHTML += `<p><strong>${item.referencia}</strong> - ${item.fecha} - ${item.responsable} - ${item.docenas} docenas</p>`;
            });
        })
        .catch(error => console.error("Error:", error));
}

function registrarTroquelado() {
    let referencia = document.getElementById("referenciaTroquelado").value;
    let cantidad = document.getElementById("cantidadTroquelado").value;
    let responsable = document.getElementById("responsableTroquelado").value;

    let datos = {
        taller: "troquelado",
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
    .then(data => alert(data))
    .catch(error => console.error("Error:", error));
}

function enviarATaller() {
    let tallerDestino = document.getElementById("tallerTroquelado").value;
    let referencia = document.getElementById("referenciaTroquelado").value;
    let cantidad = document.getElementById("cantidadTroquelado").value;
    let responsable = document.getElementById("responsableTroquelado").value;

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
    .catch(error => console.error("Error:", error));
}
