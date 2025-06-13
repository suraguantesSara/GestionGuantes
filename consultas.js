document.addEventListener("DOMContentLoaded", () => {
  cargarOpciones();
});

// Muestra solo el contenedor seleccionado
function mostrarConsulta(tipo) {
  document.getElementById("consulta-taller").style.display = "none";
  document.getElementById("consulta-referencia").style.display = "none";
  document.getElementById("consulta-proceso").style.display = "none";

  if (tipo === "taller") {
    document.getElementById("consulta-taller").style.display = "block";
  } else if (tipo === "referencia") {
    document.getElementById("consulta-referencia").style.display = "block";
  } else if (tipo === "proceso") {
    document.getElementById("consulta-proceso").style.display = "block";
  }
}

async function cargarOpciones() {
  try {
    const talleres = await fetchDatos("/api/talleres");
    const referencias = await fetchDatos("/api/referencias");

    const selectTaller = document.getElementById("selectTaller");
    const selectReferencia = document.getElementById("selectReferencia");

    talleres.forEach(t => {
      const opt = document.createElement("option");
      opt.value = t.nombre;
      opt.textContent = t.nombre;
      selectTaller.appendChild(opt);
    });

    referencias.forEach(r => {
      const opt = document.createElement("option");
      opt.value = r.nombre;
      opt.textContent = r.nombre;
      selectReferencia.appendChild(opt);
    });

  } catch (error) {
    console.error("Error al cargar opciones:", error);
  }
}

async function fetchDatos(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener datos");
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

function mostrarResultados(datos, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";

  if (datos.length === 0) {
    contenedor.textContent = "No se encontraron resultados.";
    return;
  }

  const tabla = document.createElement("table");
  tabla.className = "table table-bordered";

  const thead = tabla.createTHead();
  const encabezado = thead.insertRow();
  Object.keys(datos[0]).forEach(key => {
    const th = document.createElement("th");
    th.textContent = key;
    encabezado.appendChild(th);
  });

  const tbody = tabla.createTBody();
  datos.forEach(row => {
    const tr = tbody.insertRow();
    Object.values(row).forEach(val => {
      const td = tr.insertCell();
      td.textContent = val;
    });
  });

  contenedor.appendChild(tabla);
}

async function consultarPorTaller() {
  const taller = document.getElementById("selectTaller").value;
  if (taller) {
    const datos = await fetchDatos(`/api/docenas?taller=${encodeURIComponent(taller)}`);
    mostrarResultados(datos, "resultadoTaller");
  }
}

async function consultarPorReferencia() {
  const referencia = document.getElementById("selectReferencia").value;
  if (referencia) {
    const datos = await fetchDatos(`/api/docenas?referencia=${encodeURIComponent(referencia)}`);
    mostrarResultados(datos, "resultadoReferencia");
  }
}

async function consultarPorProceso() {
  const proceso = document.getElementById("selectProceso").value;
  if (proceso) {
    const datos = await fetchDatos(`/api/docenas?proceso=${encodeURIComponent(proceso)}`);
    mostrarResultados(datos, "resultadoProceso");
  }
}


