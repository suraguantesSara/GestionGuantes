const URL_API = 'https://script.google.com/macros/s/AKfycbyZOWU-08cBNohrfkHyYj-hQ8zH5Ubd7Fg3w8o6oRs79gvedkwzXtHcxMzwX4TzJmCmgw/exec';

function cargarVista(proceso) {
  const contenido = document.getElementById('formulario');

  if (proceso === 'troquelado') {
    contenido.innerHTML = `
      <h2>Troquelado</h2>
      <form onsubmit="registrarProducto(event)">
        <label>Referencia: <input type="text" id="referencia" required></label><br><br>
        <label>Cantidad (docenas): <input type="number" id="cantidad" required></label><br><br>
        <label>Responsable: <input type="text" id="responsable" required></label><br><br>
        <button type="submit">Registrar</button>
      </form>
    `;
  } else {
    contenido.innerHTML = `
      <h2>Enviar desde ${capitalizar(proceso)}</h2>
      <form onsubmit="enviarProducto(event, '${proceso}')">
        <label>Referencia: <input type="text" id="referencia" required></label><br><br>
        <label>Cantidad (docenas): <input type="number" id="cantidad" required></label><br><br>
        <label>Destino:
          <select id="destino">
            ${generarOpcionesDestino(proceso)}
          </select>
        </label><br><br>
        <label>Responsable: <input type="text" id="responsable" required></label><br><br>
        <button type="submit">Enviar</button>
      </form>
    `;
  }
}

function registrarProducto(event) {
  event.preventDefault();
  const referencia = document.getElementById('referencia').value;
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const responsable = document.getElementById('responsable').value;
  const fecha = new Date().toLocaleDateString();

  fetch(URL_API, {
    method: 'POST',
    body: JSON.stringify({
      action: 'registrarProducto',
      referencia,
      cantidad,
      responsable,
      fecha
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => alert('Error al registrar: ' + err.message));
}

function enviarProducto(event, origen) {
  event.preventDefault();
  const referencia = document.getElementById('referencia').value;
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const destino = document.getElementById('destino').value;
  const responsable = document.getElementById('responsable').value;

  fetch(URL_API, {
    method: 'POST',
    body: JSON.stringify({
      action: 'enviarProducto',
      referencia,
      cantidad,
      origen,
      destino,
      responsable
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => alert('Error al enviar: ' + err.message));
}

function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generarOpcionesDestino(origen) {
  const procesos = ['troquelado', 'armado', 'cerrado', 'volteado'];
  const destinos = procesos.filter(p => p !== origen);
  return destinos.map(d => `<option value="${d}">${capitalizar(d)}</option>`).join('');
}


