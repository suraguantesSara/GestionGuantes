document.addEventListener("DOMContentLoaded", () => {
  const titulo = document.getElementById("tituloProceso");
  const tabla = document.getElementById("tablaDatos");
  const formRegistro = document.getElementById("formRegistro");
  const formEnvio = document.getElementById("formEnvio");
  const formularioRegistro = document.getElementById("formularioRegistro");
  const formularioEnvio = document.getElementById("formularioEnvio");

  let procesoActual = "";

  window.seleccionarProceso = function (proceso) {
    procesoActual = proceso;
    titulo.textContent = `Proceso: ${proceso.charAt(0).toUpperCase() + proceso.slice(1)}`;
    formRegistro.style.display = "block";
    formEnvio.style.display = "block";
    tabla.innerHTML = "<p>Cargando datos...</p>";

    fetch(`https://script.google.com/macros/s/AKfycby2UsuCuIa2TKpJ9xmZuSRi4Bd5w747ScS8bsUy_bMt70U2aNoGWVDhVQsoWG-gOf7j/exec?proceso=${proceso}`)
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
          tabla.innerHTML = "<p>No hay datos registrados.</p>";
          return;
        }

        const headers = Object.keys(data[0]);
        const rows = data.map(d => `<tr>${headers.map(h => `<td>${d[h]}</td>`).join("")}</tr>`).join("");
        tabla.innerHTML = `
          <table>
            <thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead>
            <tbody>${rows}</tbody>
          </table>`;
      })
      .catch(err => {
        tabla.innerHTML = `<p>Error al cargar datos: ${err.message}</p>`;
      });
  };

  formularioRegistro.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(formularioRegistro);
    formData.append("proceso", procesoActual);
    formData.append("tipo", "registro");

    fetch("https://script.google.com/macros/s/AKfycby2UsuCuIa2TKpJ9xmZuSRi4Bd5w747ScS8bsUy_bMt70U2aNoGWVDhVQsoWG-gOf7j/exec", {
      method: "POST",
      body: formData
    })
      .then(res => res.text())
      .then(response => {
        alert("Registro exitoso");
        formularioRegistro.reset();
        seleccionarProceso(procesoActual);
      })
      .catch(error => {
        alert("Error al registrar: " + error.message);
      });
  });

  formularioEnvio.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(formularioEnvio);
    formData.append("proceso", procesoActual);
    formData.append("tipo", "envio");

    fetch("https://script.google.com/macros/s/AKfycby2UsuCuIa2TKpJ9xmZuSRi4Bd5w747ScS8bsUy_bMt70U2aNoGWVDhVQsoWG-gOf7j/exec", {
      method: "POST",
      body: formData
    })
      .then(res => res.text())
      .then(response => {
        alert("Envío registrado exitosamente");
        formularioEnvio.reset();
        seleccionarProceso(procesoActual);
      })
      .catch(error => {
        alert("Error al registrar envío: " + error.message);
      });
  });
});
