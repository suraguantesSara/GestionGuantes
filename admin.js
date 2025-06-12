const URL_API = 'https://script.google.com/macros/s/AKfycbwo_8Zyqto3trzTm55O_o0KgpwFB8bBYdT0A7Xs5GqkldVH9647maPrlDhzOWRgcB40/exec';

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
  const ingresadas = document.getElementById('ingresadas').value;
  const procesadas = document.getElementById('procesadas').value;
  const pendientes = document.getElementById('pendientes').value;
  const taller = document.getElementById('taller').value;

  if (!referencia || !ingresadas || !procesadas || !pendientes || !taller) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  const formData = new FormData();
  formData.append('action', 'registrarProduccion');
  formData.append('referencia', referencia);
  formData.append('ingresadas', ingresadas);
  formData.append('procesadas', procesadas);
  formData.append('pendientes', pendientes);
  formData.append('taller', taller);

  fetch(URL_API, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || 'Datos guardados correctamente.');
      if (data.success) {
        document.querySelector('form').reset();
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error al registrar: ' + err.message);
    });
}
