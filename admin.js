const URL_API = 'https://script.google.com/macros/s/AKfycbx6_4JYvGqEzznnPv0Zz-92c7g5BWi3wdBOlnRrduZAmN9spS8BplRewwYtEBtSgcqD/exec';

function cargarVista() {
  const contenido = document.getElementById('formulario');

  contenido.innerHTML = `
    <h2>Registrar Producción</h2>
    <form onsubmit="registrarProducto(event)">
      <label>Referencia: <input type="text" id="referencia" required></label><br><br>
      <label>Doc. Ingresadas: <input type="number" id="ingresadas" min="0" required></label><br><br>
      <label>Doc. Procesadas: <input type="number" id="procesadas" min="0" required></label><br><br>
      <label>Doc. Pendientes: <input type="number" id="pendientes" min="0" required></label><br><br>
      <label>Taller:
        <select id="taller" required>
          <option value="">Selecciona un taller</option>
          <option value="troquelado">Troquelado</option>
          <option value="armado">Armado</option>
          <option value="cerrado">Cerrado</option>
          <option value="volteado">Volteado</option>
        </select>
      </label><br><br>
      <button type="submit">Registrar</button>
    </form>
  `;
}

function registrarProducto(event) {
  event.preventDefault();

  const referencia = document.getElementById('referencia').value.trim();
  const ingresadas = parseInt(document.getElementById('ingresadas').value);
  const procesadas = parseInt(document.getElementById('procesadas').value);
  const pendientes = parseInt(document.getElementById('pendientes').value);
  const taller = document.getElementById('taller').value;

  if (!referencia || isNaN(ingresadas) || isNaN(procesadas) || isNaN(pendientes) || !taller) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  fetch(URL_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'registrarProduccion',
      referencia,
      ingresadas,
      procesadas,
      pendientes,
      taller
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      if (data.success) {
        document.querySelector('form').reset();
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error al registrar: ' + err.message);
    });
}



