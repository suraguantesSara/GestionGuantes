const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbzVo3xVYvh4HcAIQ6e1VzoDMqC1-7rXV2-V04D4eHHFRxnKj0fKfH6DWxRvDO4blhdg/exec";

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
    id_referencia: Number(form.id_referencia.value),
    cantidad_asignada: Number(form.cantidad_asignada.value),
    cantidad_terminada: Number(form.cantidad_terminada.value),
    id_taller: Number(form.id_taller.value)
  };

  fetch(URL_SCRIPT, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
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
