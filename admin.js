// admin.js

let procesoSeleccionado = "";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("formularioRegistro").addEventListener("submit", registrarProduccion);
  document.getElementById("formularioEnvio").addEventListener("submit", enviarProduccion);
});

function seleccionarProceso(proceso) {
  procesoSeleccionado = proceso;
  document.getElementById("tituloProceso").textContent = proceso.charAt(0).toUpperCase() + proceso.slice(1);
  document.getElementById("formRegistro").style.display = proceso === "troquelado" ? "block" : "none";
  document.getElementById("formEnvio").style.display = proceso !== "stock" ? "block" : "none";
  cargarDatos();
}

function cargarDatos() {
  fetch("https://script.google.com/macros/s/AKfycby2UsuCuIa2TKpJ9xmZuSRi4Bd5w747ScS8bsUy_bMt70U2aNoGWVDhVQsoWG-gOf7j/exec?proceso=" + procesoSeleccionado)
    .then(res => res.json())
    .then(data => mostrarTabla(data))
    .catch(err => {
      console.error("Error cargando datos:", err);
      document.getElementById("tablaDatos").innerHTML = "<p>Error al cargar datos.</p>";
    });
}

function mostrarTabla(datos) {
  if (!datos || datos.length === 0) {
    document.getElementById("tablaDatos").innerHTML = "<p>No hay datos disponibles.</p>";
    return;
  }

  let tabla = "<table><thead><tr>";
  Object.keys(datos[0]).forEach(col => {
    tabla += `<th>${col}</th>`;
  });
  tabla += "</tr></thead><tbody>";

  datos.forEach(fila => {
    tabla += "<tr>";
    Object.values(fila).forEach(valor => {
      tabla += `<td>${valor}</td>`;
    });
    tabla += "</tr>";
  });

  tabla += "</tbody></table>";
  document.getElementById("tablaDatos").innerHTML = tabla;
}

function registrarProduccion(e) {
  e.preventDefault();
  const form = e.target;
  const datos = new FormData();
  datos.append("proceso", procesoSeleccionado);
  datos.append("REFERENCIA", form.referencia.value);
  datos.append("CANTIDAD", form.cantidad.value);

  fetch("https://script.google.com/macros/s/AKfycby2UsuCuIa2TKpJ9xmZuSRi4Bd5w747ScS8bsUy_bMt70U2aNoGWVDhVQsoWG-gOf7j/exec", {
    method: "POST",
    body: datos
  })
    .then(res => res.text())
    .then(respuesta => {
      alert(respuesta);
      form.reset();
      cargarDatos();
    })
    .catch(err => {
      console.error("Error al registrar:", err);
      alert("Error al registrar datos");
    });
}

function enviarProduccion(e) {
  e.preventDefault();
  const form = e.target;
  const datos = new FormData();
  datos.append("proceso", procesoSeleccionado);
  datos.append("REFERENCIA", form.referencia.value);
  datos.append("CANTIDAD", form.cantidad.value);
  datos.append("DESTINO", form.destino.value);
  datos.append("ENVIADO", "Sí");

  fetch("https://script.google.com/macros/s/AKfycby2UsuCuIa2TKpJ9xmZuSRi4Bd5w747ScS8bsUy_bMt70U2aNoGWVDhVQsoWG-gOf7j/exec", {
    method: "POST",
    body: datos
  })
    .then(res => res.text())
    .then(respuesta => {
      alert(respuesta);
      form.reset();
      cargarDatos();
    })
    .catch(err => {
      console.error("Error al enviar:", err);
      alert("Error al enviar datos");
    });
}
