const scriptURL = 'https://script.google.com/macros/s/AKfycbzpBS6TkLYNXZ2f65HztyKSgMowP3jHwDoJcahiP0a2TFQ7IOfLpJSHDxKV7oo21chS/exec';

let procesoActual = '';

function seleccionarProceso(proceso) {
  procesoActual = proceso;
  document.getElementById('tituloProceso').textContent = `Proceso: ${proceso.charAt(0).toUpperCase() + proceso.slice(1)}`;
  document.getElementById('formRegistro').style.display = 'block';
  document.getElementById('formEnvio').style.display = 'block';
  cargarDatos(proceso);
}

async function cargarDatos(proceso) {
  try {
    const res = await fetch(`${scriptURL}?proceso=${proceso}&accion=consultar`);
    const data = await res.json();
    mostrarTabla(data);
  } catch (error) {
    document.getElementById('tablaDatos').innerHTML = '<p>Error al cargar los datos.</p>';
    console.error(error);
  }
}

function mostrarTabla(data) {
  if (!Array.isArray(data) || data.length === 0) {
    document.getElementById('tablaDatos').innerHTML = '<p>No hay datos registrados.</p>';
    return;
  }

  let tabla = '<table><thead><tr>';
  Object.keys(data[0]).forEach(key => {
    tabla += `<th>${key}</th>`;
  });
  tabla += '</tr></thead><tbody>';

  data.forEach(fila => {
    tabla += '<tr>';
    Object.values(fila).forEach(valor => {
      tabla += `<td>${valor}</td>`;
    });
    tabla += '</tr>';
  });

  tabla += '</tbody></table>';
  document.getElementById('tablaDatos').innerHTML = tabla;
}

// REGISTRAR

const formRegistro = document.getElementById('formularioRegistro');
formRegistro.addEventListener('submit', async (e) => {
  e.preventDefault();

  const datos = new FormData(formRegistro);
  datos.append('accion', 'registrar');
  datos.append('proceso', procesoActual);

  try {
    const res = await fetch(scriptURL, {
      method: 'POST',
      body: datos,
    });

    const result = await res.json();
    alert(result.mensaje || 'Registrado correctamente.');
    formRegistro.reset();
    cargarDatos(procesoActual);
  } catch (error) {
    alert('Error al registrar.');
    console.error(error);
  }
});

// ENVIAR

const formEnvio = document.getElementById('formularioEnvio');
formEnvio.addEventListener('submit', async (e) => {
  e.preventDefault();

  const datos = new FormData(formEnvio);
  datos.append('accion', 'enviar');
  datos.append('proceso', procesoActual);

  try {
    const res = await fetch(scriptURL, {
      method: 'POST',
      body: datos,
    });

    const result = await res.json();
    alert(result.mensaje || 'Enviado correctamente.');
    formEnvio.reset();
    cargarDatos(procesoActual);
  } catch (error) {
    alert('Error al enviar.');
    console.error(error);
  }
});
