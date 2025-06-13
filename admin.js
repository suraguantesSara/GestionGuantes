document.addEventListener("DOMContentLoaded", () => {
  cargarReferencias(); 
  cargarDocenas();
  actualizarDestinoYtalleres(); 
  setupForm("taller");
  setupForm("referencia");
  setupForm("docenas");
  setupForm("movimiento");
});

function setupForm(tipo) {
  const form = document.getElementById(`${tipo}-form`);
  form.addEventListener("submit", async event => {
    event.preventDefault();
    let url = "", data = {};

    if (tipo === "taller") {
      url = "/crear-taller";
      data = {
        nombre: form.nombre.value,
        area: form.proceso.value
      };
    }
    if (tipo === "referencia") {
      url = "/crear-referencia";
      data = {
        nombre: form.referencia.value,
        descripcion: form.nombre.value
      };
    }
    if (tipo === "docenas") {
      url = "/crear-docena";
      data = {
        referencia_id: form.referencia.value,
        taller_actual_id: form.taller.value
      };
    }
    if (tipo === "movimiento") {
      url = "/registrar-movimiento";
      data = {
        docena_id: form.docena_id.value,
        proceso_origen: form.origen.value,
        observaciones: form.observaciones.value
      };
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      const text = await res.text();
      alert(text);
      form.reset();
      if (tipo === "docenas") cargarDocenas();
    } catch (err) {
      console.error(err);
      alert("Error guardando " + tipo);
    }
  });
}

async function cargarReferencias() {
  const select = document.getElementById("referencia");
  if (!select) return;
  try {
    const res = await fetch("/api/referencias");
    const ref = await res.json();
    select.innerHTML = ref.map(r => `<option value="${r.id}">${r.nombre}</option>`).join("");
  } catch (err) {
    console.error("Error cargando referencias", err);
  }
}

async function cargarDocenas() {
  const select = document.getElementById("docena_id");
  if (!select) return;
  try {
    const res = await fetch("/api/docenas");
    const data = await res.json();
    select.innerHTML = data.map(d => `<option value="${d.id}">Docena #${d.id}</option>`).join("");
  } catch (err) {
    console.error("Error cargando docenas", err);
  }
}

function actualizarDestinoYtalleres() {
  //implementar esto si necesitas cambiar áreas dinámicamente
}
