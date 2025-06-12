const URL_API = "https://script.google.com/macros/s/AKfycby2UsuCuIa2TKpJ9xmZuSRi4Bd5w747ScS8bsUy_bMt70U2aNoGWVDhVQsoWG-gOf7j/exec";

let procesoSeleccionado = null;

// Selecciona proceso y carga datos
function seleccionarProceso(proceso) {
  procesoSeleccionado = proceso;
  document.getElementById("tituloProceso").textContent = `Proceso: ${proceso.charAt(0).toUpperCase() + proceso.slice(1)}`;
  cargarDatos();

  // Mostrar formularios solo para troquelado
  if (proceso === "troquelado") {
    document.getElementById("formRegistro").style.display = "block";
    document.getElementById("formEnvio").style.display = "block";
  } else {
    document.getElementById("formRegistro").style.display = "none";
    document.getElementById("formEnvio").style.display = "none";
  }
}

// Carga datos de la hoja
function cargarDatos() {
  fetch(`${URL_API}?proceso=${procesoSeleccionado}`)
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById("tablaDatos");
      if (!Array.isArray(data)) {
        contenedor.innerHTML = "<p>Error cargando datos</p>";
        return;
      }

      if (data.length === 0) {
        contenedor.innerHTML = "<p>No hay datos aún.</p>";
        return;
      }

      const headers = Object.keys(data[0]);
      let html = "<table><thead><tr>";
      headers.forEach(h => html += `<th>${h}</th>`);
      html += "</tr></thead><tbody>";

      data.forEach(row => {
        html += "<tr>";
        headers.forEach(h => html += `<td>${row[h]}</td>`);
        html += "</tr>";
      });

      html += "</tbody></table>";
      contenedor.innerHTML = html;
    })
    .catch(err => {
      console.error("❌ Error al cargar datos:", err);
      document.getElementById("tablaDatos").innerHTML = "<p>Error al cargar datos</p>";
    });
}

// Registrar datos en hoja
function registrarProduccion(e) {
  e.preventDefault();

  const form = e.target;
  const datos = new FormData();
  datos.append("accion", "registrar");
  datos.append("proceso", procesoSeleccionado);
  datos.append("REFERENCIA", form.referencia.value.trim());
  datos.append("CANTIDAD", form.cantidad.value.trim());

  console.log("📤 Enviando:", Object.fromEntries(datos.entries()));

  fetch(URL_API, {
    method: "POST",
    body: datos
  })
    .then(res => res.text())
    .then(respuesta => {
      console.log("✅ Respuesta:", respuesta);
      alert("Datos registrados");
      form.reset();
      cargarDatos();
    })
    .catch(err => {
      console.error("❌ Error al registrar:", err);
      alert("Error al guardar datos");
    });
}

// Enviar a otro taller
function enviarProduccion(e) {
  e.preventDefault();

  const form = e.target;
  const datos = new FormData();
  datos.append("accion", "enviar");
  datos.append("proceso", procesoSeleccionado);
  datos.append("REFERENCIA", form.referencia.value.trim());
  datos.append("CANTIDAD", form.cantidad.value.trim());
  datos.append("DESTINO", form.destino.value.trim());

  console.log("📤 Enviando:", Object.fromEntries(datos.entries()));

  fetch(URL_API, {
    method: "POST",
    body: datos
  })
    .then(res => res.text())
    .then(respuesta => {
      console.log("✅ Respuesta:", respuesta);
      alert("Envío registrado");
      form.reset();
      cargarDatos();
    })
    .catch(err => {
      console.error("❌ Error al enviar:", err);
      alert("Error al enviar datos");
    });
}

// Vincular eventos cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("formularioRegistro");
  const formEnvio = document.getElementById("formularioEnvio");

  if (formRegistro) formRegistro.addEventListener("submit", registrarProduccion);
  if (formEnvio) formEnvio.addEventListener("submit", enviarProduccion);
});
