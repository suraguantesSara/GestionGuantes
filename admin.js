const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzF2fYjCaEhUxXjoCU7YIC0Z2DqHHvo4yGC7c_xzbeTo28gjU78pic2KbFxpgcem_6JvA/exec';

// --- Funciones para la Interfaz de Usuario ---

function mostrarTalleres(tipo, inicio, fin) {
    console.log("Mostrando talleres de:", tipo);

    let titulo = document.getElementById("tituloTaller");
    let lista = document.getElementById("listaTalleres");
    // CORRECCIÓN: Tu HTML usa la clase 'panel', no 'talleres-panel'.
    // Aseguramos que el elemento exista y esté cargado en el DOM.
    let seccion = document.querySelector(".panel"); 

    if (titulo) {
        titulo.innerText = "Talleres de " + tipo.charAt(0).toUpperCase() + tipo.slice(1);
    }
    
    if (lista) {
        lista.innerHTML = ""; // Limpia la lista existente

        for (let i = inicio; i <= fin; i++) {
            let taller = document.createElement("div");
            taller.className = "taller-list";
            taller.innerText = "Taller " + i;
            lista.appendChild(taller);
        }
    }

    // Si 'panel' existe, remueve la clase 'hidden' (aunque no la tiene en tu HTML,
    // es buena práctica por si la agregas con CSS para ocultarlo inicialmente).
    if (seccion && seccion.classList.contains("hidden")) {
        seccion.classList.remove("hidden");
    }

    // Ocultar formularios al cambiar de taller
    document.getElementById("formularioRegistrar").classList.add("hidden");
    document.getElementById("formularioEnviar").classList.add("hidden");
}

function mostrarFormulario(tipo) {
    // Oculta ambos formularios primero
    const formRegistrar = document.getElementById("formularioRegistrar");
    const formEnviar = document.getElementById("formularioEnviar");

    if (formRegistrar) formRegistrar.classList.add("hidden");
    if (formEnviar) formEnviar.classList.add("hidden");

    // Muestra el formulario deseado
    if (tipo === "registrar" && formRegistrar) {
        formRegistrar.classList.remove("hidden");
    } else if (tipo === "enviar" && formEnviar) {
        formEnviar.classList.remove("hidden");
    }
}

// --- Funciones para la Conexión con Google Apps Script ---

async function registrarProducto() {
    let referencia = document.getElementById("referencia").value;
    let cantidad = document.getElementById("cantidad").value;
    let responsable = document.getElementById("responsable").value;
    let fecha = new Date().toLocaleDateString();

    if (!referencia || !cantidad || !responsable) {
        alert("Por favor, completa todos los campos (Referencia, Cantidad, Responsable) para registrar el producto.");
        return;
    }
    // Asegurar que la cantidad es un número válido
    cantidad = parseInt(cantidad);
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("La cantidad debe ser un número positivo.");
        return;
    }

    const data = {
        action: 'registrarProducto',
        referencia: referencia,
        cantidad: cantidad,
        responsable: responsable,
        fecha: fecha
    };

    try {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8', // Crucial para Apps Script
            },
            body: JSON.stringify(data),
            mode: 'cors'
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            // Opcional: Limpiar los campos o actualizar la tabla de productos registrados
            document.getElementById("referencia").value = ''; // Resetea el select
            document.getElementById("cantidad").value = '';
            document.getElementById("responsable").value = '';
        } else {
            alert("Error al registrar producto: " + result.message);
        }
    } catch (error) {
        console.error('Error al conectar con Apps Script:', error);
        alert("Hubo un problema de conexión al registrar el producto. Inténtalo de nuevo.");
    }
}


async function enviarProducto() {
    let tallerDestinoValue = document.getElementById("tallerDestino").value;
    let referencia = document.getElementById("referenciaEnviar").value;
    let cantidad = document.getElementById("cantidadEnviar").value;
    // ADICIÓN: Obtener el responsable del nuevo campo en el HTML
    let responsable = document.getElementById("responsableEnviar").value; 
    
    // ADICIÓN: El taller de origen por defecto será 'Troquelado'.
    // Si tu UI permite seleccionar el taller de origen, deberías capturar ese valor.
    let tallerOrigen = "Troquelado"; 

    if (!tallerDestinoValue || !referencia || !cantidad || !responsable) {
        alert("Por favor, completa todos los campos (Taller Destino, Referencia, Cantidad, Responsable) para enviar el producto.");
        return;
    }
    // Asegurar que la cantidad es un número válido
    cantidad = parseInt(cantidad);
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("La cantidad debe ser un número positivo.");
        return;
    }

    // ADICIÓN/CORRECCIÓN: Mapeo de valores de taller del HTML a nombres de hoja exactos en Google Sheets
    // ¡IMPORTANTE! Asegúrate de que estos nombres coincidan exactamente con tus pestañas en Google Sheets.
    const tallerMap = {
        "Troquelado": "Troquelado", 
        "Armado": "Armado",
        "Cerrado": "Cerrado",
        "Volteado": "Volteado",
        "Stock": "Stock" 
    };

    // Obtenemos los nombres de las hojas exactos para Apps Script
    const origenSheetName = tallerMap[tallerOrigen]; 
    const destinoSheetName = tallerMap[tallerDestinoValue];

    if (!origenSheetName) {
        alert(`Error: El taller de origen "${tallerOrigen}" no tiene un mapeo válido a una hoja. Verifica los nombres de tus hojas de cálculo.`);
        return;
    }
    if (!destinoSheetName) {
        alert(`Error: El taller de destino "${tallerDestinoValue}" no tiene un mapeo válido a una hoja. Verifica los nombres de tus hojas de cálculo.`);
        return;
    }

    const data = {
        action: 'enviarProducto',
        referencia: referencia,
        cantidad: cantidad,
        origen: origenSheetName, // Nombre de la hoja de origen
        destino: destinoSheetName, // Nombre de la hoja de destino
        responsable: responsable
    };

    try {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(data),
            mode: 'cors'
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            // Limpiar los campos después de un envío exitoso
            document.getElementById("tallerDestino").value = ''; // Resetea el select
            document.getElementById("referenciaEnviar").value = ''; // Resetea el select
            document.getElementById("cantidadEnviar").value = '';
            document.getElementById("responsableEnviar").value = ''; // ADICIÓN: Limpiar el campo responsable
        } else {
            alert("Error al enviar producto: " + result.message);
        }
    } catch (error) {
        console.error('Error al conectar con Apps Script:', error);
        alert("Hubo un problema de conexión al enviar el producto. Inténtalo de nuevo.");
    }
}

function volverAtras() {
    window.history.back();
}

// Opcional: Para cargar los datos iniciales al cargar la página
document.addEventListener('DOMContentLoaded', (event) => {
    // Si quieres que el panel de talleres se muestre por defecto al cargar,
    // puedes llamar a mostrarTalleres aquí.
    // Por ejemplo, para mostrar "Troquelado" al inicio:
    // mostrarTalleres('troquelado', 1, 6); 
});

