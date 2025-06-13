// admin.js - cliente para admin.html

document.addEventListener('DOMContentLoaded', async () => {
  cargarReferencias();
  cargarTalleres();

  document.getElementById('taller-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const area = e.target.proceso.value;

    await fetch('/crear-taller', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, area })
    });

    e.target.reset();
    alert('Taller guardado');
  });

  document.getElementById('referencia-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const referencia = e.target.referencia.value;
    const nombre = e.target.nombre.value;

    await fetch('/crear-referencia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: referencia, descripcion: nombre })
    });

    e.target.reset();
    alert('Referencia guardada');
  });

  document.getElementById('docenas-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const referencia_id = e.target.referencia.value;
    const cantidad = parseInt(e.target.cantidad.value);

    for (let i = 0; i < cantidad; i++) {
      await fetch('/crear-docena', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referencia_id, taller_actual_id: null })
      });
    }

    e.target.reset();
    alert('Docenas registradas');
  });

  document.getElementById('movimiento-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const origen = e.target.origen.value;
    const destino = e.target.destino.value;
    const tallerNombre = e.target.taller.value;
    const observaciones = e.target.observaciones.value;

    const docenas = await (await fetch(`/api/docenas?proceso=${origen}`)).json();
    if (!docenas.length) return alert('No hay docenas para mover desde este proceso.');

    for (const docena of docenas) {
      await fetch('/registrar-movimiento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docena_id: docena.id,
          proceso_origen: origen,
          observaciones
        })
      });
    }

    e.target.reset();
    alert('Movimientos registrados');
  });
});

async function cargarReferencias() {
  const res = await fetch('/api/referencias');
  const referencias = await res.json();
  const select = document.getElementById('referencias-select');
  select.innerHTML = referencias.map(ref => `<option value="${ref.id}">${ref.nombre}</option>`).join('');
}

async function cargarTalleres() {
  const res = await fetch('/api/talleres');
  const talleres = await res.json();
  const select = document.getElementById('taller-destino');
  select.innerHTML = talleres.map(t => `<option value="${t.nombre}">${t.nombre}</option>`).join('');
}
