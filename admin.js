const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxjI774UwiL_cuwtw_BKe1dmPzGZBEfKS_b8YA3uMDkuHk76njh57a3OLTpX_cH8wLW/exec"; // Reemplaza con la URL publicada de tu Apps Script

function registrarProduccion() {
    const proceso = document.getElementById("proceso").value;
    const referencia = document.getElementById("referencia").value;
    const cantidad = document.getElementById("cantidad").value;

    fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
            accion: "registrar",
            proceso: proceso,
            REFERENCIA: referencia,
            CANTIDAD: cantidad
        })
    }).then(response => response.json())
      .then(data => alert(data.status))
      .catch(error => console.error("Error:", error));
}

function enviarProduccion() {
    const proceso = document.getElementById("proceso").value;
    const referencia = document.getElementById("referenciaEnvio").value;
    const cantidad = document.getElementById("cantidadEnvio").value;
    const destino = document.getElementById("destino").value;

    fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
            accion: "enviar",
            proceso: proceso,
            REFERENCIA: referencia,
            CANTIDAD: cantidad,
            DESTINO: destino
        })
    }).then(response => response.json())
      .then(data => alert(data.status))
      .catch(error => console.error("Error:", error));
}

function cargarRegistros() {
    const proceso = document.getElementById("proceso").value;

    fetch(`${SCRIPT_URL}?proceso=${proceso}`)
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector("#tablaRegistros tbody");
        tbody.innerHTML = "";
        data.forEach(row => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${row.fecha}</td><td>${row.referencia}</td><td>${row.cantidad}</td>`;
            tbody.appendChild(tr);
        });
    })
    .catch(error => console.error("Error:", error));
}
