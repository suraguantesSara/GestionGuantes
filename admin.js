const URL_API = 'https://script.google.com/macros/s/AKfycbz8cCy30yD1WEmtRaE6xFuXjAiGM_dzbWwUiVEsIFotHADOI8dh0pazYHk27W2ibCTP5Q/exec';

function cargarVista(proceso) {
  const contenido = document.getElementById('formulario');

  if (proceso === 'troquelado') {
    contenido.innerHTML = `
      <h2>Troquelado</h2>
      <form onsubmit="registrarProducto(event)">
        <label>Referencia: <input type="text" id="referencia" required></label><br><br>
        <label>Cantidad (docenas): <input type="number" id="cantidad" min="1" required></label><br><br>
        <label>Responsable: <input type="text" id="responsable" required></label><br><br>
        <button type="submit">Registrar</button>
      </form>
    `;
  } else {
    contenido.innerHTML = `
      <h2>Enviar desde ${capitalizar(proceso)}</h2>
      <form onsubmit="enviarProducto(event, '${proceso}')">
        <label>Referencia: <input type="text" id="referencia" required></label><br><br>
        <label>Cantidad (docenas): <input type="number" id="cantidad" min="1" required></label><br><br>
        <label>Destino:
          <select id="destino" required>
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

  const referencia = document.getElementById('referencia').value.trim();
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const responsable = document.getElementById('responsable').value.trim();

  if (!referencia || !cantidad || !responsable) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  fetch(URL_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'registrarProducto',
      referencia,
      cantidad,
      responsable
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

function enviarProducto(event, origen) {
  event.preventDefault();

  const referencia = document.getElementById('referencia').value.trim();
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const destino = document.getElementById('destino').value;
  const responsable = document.getElementById('responsable').value.trim();

  if (!referencia || !cantidad || !destino || !responsable) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  fetch(URL_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'enviarProducto',
      referencia,
      cantidad,
      origen,
      destino,
      responsable
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
      alert('Error al enviar: ' + err.message);
    });
}

function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generarOpcionesDestino(origen) {
  const procesos = ['troquelado', 'armado', 'cerrado', 'volteado'];
  return procesos
    .filter(p => p !== origen)
    .map(d => `<option value="${d}">${capitalizar(d)}</option>`)
    .join('');
}



