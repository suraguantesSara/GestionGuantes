
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzF2fYjCaEhUxXjoCU7YIC0Z2DqHHvo4yGC7c_xzbeTo28gjU78pic2KbFxpgcem_6JvA/exec';

function mostrarTalleres(tipo, inicio, fin) {
    console.log("Mostrando talleres de:", tipo);

    let titulo = document.getElementById("tituloTaller");
    let lista = document.getElementById("listaTalleres");
    let seccion = document.querySelector(".talleres-panel");

    titulo.innerText = "Talleres de " + tipo.charAt(0).toUpperCase() + tipo.slice(1);
    lista.innerHTML = "";

    for (let i = inicio; i <= fin; i++) {
        let taller = document.createElement("div");
        taller.className = "taller-list";
        taller.innerText = "Taller " + i;
        lista.appendChild(taller);
    }

    seccion.classList.remove("hidden");
}

// Mostrar formularios de registro y envío
function mostrarFormulario(tipo) {
    document.getElementById("formularioRegistrar").classList.add("hidden");
    document.getElementById("formularioEnviar").classList.add("hidden");

    if (tipo === "registrar") {
        document.getElementById("formularioRegistrar").classList.remove("hidden");
    } else if (tipo === "enviar") {
        document.getElementById("formularioEnviar").classList.remove("hidden");
    }
}

// Registrar nuevo producto - ¡MODIFICADO!
async function registrarProducto() {
    let referencia = document.getElementById("referencia").value;
    let cantidad = document.getElementById("cantidad").value;
    let responsable = document.getElementById("responsable").value;
    let fecha = new Date().toLocaleDateString(); // Formato local de fecha

    if (!referencia || !cantidad || !responsable) {
        alert("Por favor, completa todos los campos para registrar el producto.");
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
                'Content-Type': 'text/plain;charset=utf-8', // Importante para Apps Script
            },
            body: JSON.stringify(data),
            mode: 'cors'
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            // Opcional: Limpiar los campos después de un registro exitoso
            document.getElementById("referencia").value = '';
            document.getElementById("cantidad").value = '';
            document.getElementById("responsable").value = '';
        } else {
            alert("Error al registrar producto: " + result.message);
        }
    } catch (error) {
        console.error('Error al conectar con Apps Script:', error);
        alert("Hubo un problema al registrar el producto. Inténtalo de nuevo.");
    }
}

// Enviar producto a otro taller - ¡MODIFICADO!
async function enviarProducto() {
    let tallerDestino = document.getElementById("tallerDestino").value;
    let referencia = document.getElementById("referenciaEnviar").value;
    let cantidad = document.getElementById("cantidadEnviar").value;
    // Asume que tienes un campo para el responsable aquí.
    // Si no lo tienes, puedes agregarlo o usar un valor predeterminado/constante.
    let responsable = document.getElementById("responsableEnviar").value; 
    
    // Si no tienes un campo para "tallerOrigen", puedes definirlo de forma estática
    // o hacer que la interfaz de usuario permita seleccionarlo.
    // Para este ejemplo, lo dejaremos como "Troquelado" como punto de partida.
    let tallerOrigen = "Troquelado"; 

    if (!tallerDestino || !referencia || !cantidad || !responsable) {
        alert("Por favor, completa todos los campos para enviar el producto.");
        return;
    }

    // Mapeo de valores de taller para que coincidan con los nombres de las hojas en Google Sheets
    const tallerMap = {
        "troquelado": "Troquelado",
        "armado": "Armado",
        "cerrado": "Cerrado",
        "volteado": "Volteado",
        "stock": "Stock"
    };

    const origenSheetName = tallerMap[tallerOrigen.toLowerCase()];
    const destinoSheetName = tallerMap[tallerDestino.toLowerCase()];

    if (!origenSheetName || !destinoSheetName) {
        alert("Selecciona un taller de origen y destino válido.");
        return;
    }

    const data = {
        action: 'enviarProducto',
        referencia: referencia,
        cantidad: cantidad,
        origen: origenSheetName,
        destino: destinoSheetName,
        responsable: responsable
    };

    try {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8', // Importante para Apps Script
            },
            body: JSON.stringify(data),
            mode: 'cors'
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            // Opcional: Limpiar los campos después de un envío exitoso
            document.getElementById("tallerDestino").value = '';
            document.getElementById("referenciaEnviar").value = '';
            document.getElementById("cantidadEnviar").value = '';
            document.getElementById("responsableEnviar").value = '';
        } else {
            alert("Error al enviar producto: " + result.message);
        }
    } catch (error) {
        console.error('Error al conectar con Apps Script:', error);
        alert("Hubo un problema al enviar el producto. Inténtalo de nuevo.");
    }
}

function volverAtras() {
    window.history.back();
}
