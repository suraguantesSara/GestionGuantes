const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbxmeCSSwyV8XSqQGhAQ98uTaq1ANyWRlon4jQ-mij0RxctdqmBxUiAB2WWmNpUYjoZx/exec";

function mostrarFormulario(proceso) {
  document.getElementById("tituloFormulario").innerText = `Formulario: ${proceso}`;
  document.getElementById("proceso").value = proceso;
  document.getElementById("formularioProceso").reset();
  document.getElementById("respuesta").innerText = "";
}

function enviarFormulario(e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    proceso: form.proceso.value,
    id_referencia: form.id_referencia.value,
    cantidad_asignada: form.cantidad_asignada.value,
    cantidad_terminada: form.cantidad_terminada.value,
    id_taller: form.id_taller.value
  };

  const query = new URLSearchParams(data).toString();

  fetch(`${URL_SCRIPT}?${query}`)
    .then(res => res.json())
    .then(response => {
      if (response.success) {
        document.getElementById("respuesta").innerText =
          `✅ Registrado: ${response.data.proceso} - ${response.data.referencia} por ${response.data.taller}`;
        form.reset();
      } else {
        document.getElementById("respuesta").innerText = `⚠️ Error: ${response.message}`;
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById("respuesta").innerText = "❌ Error al enviar datos.";
    });
}
