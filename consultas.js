document.addEventListener("DOMContentLoaded", () => {
  cargarOpciones();

  document.getElementById("filtro-taller").addEventListener("change", async (e) => {
    const taller = e.target.value;
    if (taller) {
      const datos = await fetchDatos(`/api/docenas?taller=${encodeURIComponent(taller)}`);
      mostrarResultados(datos);
    }
  });

  document.getElementById("filtro-referencia").addEventListener("change", async (e) => {
    const referencia = e.target.value;
    if (referencia) {
      const datos = await fetchDatos(`/api/docenas?referencia=${encodeURIComponent(referencia)}`);
      mostrarResultados(datos);
    }
  });

  document.getElementById("filtro-proceso").addEventListener("change", async (e) => {
    const proceso = e.target.value;
    if (proceso) {
      const datos = await fetchDatos(`/api/docenas?proceso=${encodeURIComponent(proceso)}`);
      mostrarResultados(datos);
    }
  });
});

async function cargarOpciones() {
  try {
    const talleres = await fetchDatos("/api/talleres");
    const referencias = await fetchDatos("/api/referencias");

    const selectTaller = document.getElementById("filtro-taller");
    const selectReferencia = document.getElementById("filtro-referencia");
    const selectProceso = document.getElementById("filtro-proceso");

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

    const procesos = ["troquelado", "armado", "cerrado", "volteado"];
    procesos.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p;
      opt.textContent = p.charAt(0).toUpperCase() + p.slice(1);
      selectProceso.appendChild(opt);
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

function mostrarResultados(datos) {
  const contenedor = document.getElementById("resultado");
  contenedor.innerHTML = ""; // limpia

  if (datos.length === 0) {
    contenedor.textContent = "No se encontraron resultados.";
    return;
  }

  const tabla = document.createElement("table");
  tabla.className = "table table-bordered";

  // Encabezado
  const thead = tabla.createTHead();
  const encabezado = thead.insertRow();
  Object.keys(datos[0]).forEach(key => {
    const th = document.createElement("th");
    th.textContent = key;
    encabezado.appendChild(th);
  });

  // Cuerpo
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

