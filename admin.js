document.addEventListener("DOMContentLoaded", function () {
  const tituloProceso = document.getElementById("tituloProceso");
  const formRegistro = document.getElementById("formRegistro");
  const formularioRegistro = document.getElementById("formularioRegistro");
  const tablaDatos = document.getElementById("tablaDatos");

  let procesoSeleccionado = null;

  window.seleccionarProceso = function (proceso) {
    procesoSeleccionado = proceso;
    tituloProceso.textContent = "Proceso: " + capitalizar(proceso);

    // Mostrar formulario solo si es troquelado
    if (proceso === "troquelado") {
      formRegistro.style.display = "block";
    } else {
      formRegistro.style.display = "none";
    }

    // Aquí podrías cargar datos del proceso
    // obtenerDatos(proceso);
  };

  formularioRegistro.addEventListener("submit", function (e) {
    e.preventDefault();

    const datos = new FormData(formularioRegistro);
    datos.append("proceso", procesoSeleccionado);

    fetch("https://script.google.com/macros/s/AKfycby2UsuCuIa2TKpJ9xmZuSRi4Bd5w747ScS8bsUy_bMt70U2aNoGWVDhVQsoWG-gOf7j/exec", {
      method: "POST",
      body: datos,
    })
      .then((res) => res.text())
      .then((msg) => {
        alert("Registro exitoso: " + msg);
        formularioRegistro.reset();
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Error al enviar los datos.");
      });
  });

  function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
});
