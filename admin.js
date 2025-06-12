// URL del endpoint del Apps Script
const URL_API = 'https://script.google.com/macros/s/AKfycby2UsuCuIa2TKpJ9xmZuSRi4Bd5w747ScS8bsUy_bMt70U2aNoGWVDhVQsoWG-gOf7j/exec';

// Función para mostrar un formulario y ocultar los demás
function mostrarFormulario(formularioId) {
  const formularios = document.querySelectorAll('.formulario-proceso');
  formularios.forEach(f => f.style.display = 'none');

  const formularioActivo = document.getElementById(formularioId);
  if (formularioActivo) formularioActivo.style.display = 'block';
}

// Registro de troquelado
function registrarTroquelado(event) {
  event.preventDefault();

  const referencia = document.getElementById('referencia-troquelado').value.trim();
  const cantidad = parseInt(document.getElementById('cantidad-troquelado').value);

  if (!referencia || isNaN(cantidad)) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  const datos = {
    hoja: 'troquelado',
    action: 'registrar',
    referencia,
    cantidad
  };

  enviarDatos(datos);
}

// Enviar desde un proceso a otro taller
function enviarProceso(event, proceso) {
  event.preventDefault();

  const referencia = document.getElementById(`referencia-${proceso}`).value.trim();
  const cantidad = parseInt(document.getElementById(`cantidad-${proceso}`).value);
  const destino = document.getElementById(`destino-${proceso}`).value;

  if (!referencia || isNaN(cantidad) || !destino) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  const datos = {
    hoja: proceso,
    action: 'enviar',
    referencia,
    cantidad,
    destino
  };

  enviarDatos(datos);
}

// Función general para enviar datos al Apps Script
function enviarDatos(payload) {
  fetch(URL_API, {
    method: 'POST',
    mode: 'no-cors', // Importante para evitar CORS error
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(() => {
      alert('Datos enviados correctamente');
      document.querySelectorAll('form').forEach(f => f.reset());
    })
    .catch(error => {
      console.error('Error al enviar:', error);
      alert('Hubo un error al enviar los datos.');
    });
}

// Asociar eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('form-troquelado').addEventListener('submit', registrarTroquelado);

  ['troquelado', 'armado', 'cerrado', 'volteado'].forEach(proceso => {
    const form = document.getElementById(`form-${proceso}-envio`);
    if (form) {
      form.addEventListener('submit', (e) => enviarProceso(e, proceso));
    }
  });
});
