function mostrarSeccion(seccion) {
    console.log("Mostrando sección:", seccion); // Verifica si el evento se activa

    let todasLasSecciones = document.querySelectorAll('.section');
    
    if (todasLasSecciones.length === 0) {
        console.error("No se encontraron secciones con la clase 'section'.");
        return;
    }

    todasLasSecciones.forEach(sec => sec.classList.add('hidden'));

    let seccionMostrar = document.getElementById(seccion);
    if (seccionMostrar) {
        seccionMostrar.classList.remove('hidden');
        console.log("Sección mostrada correctamente:", seccion);
    } else {
        console.error("Sección no encontrada:", seccion);
    }
}
