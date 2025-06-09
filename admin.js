function mostrarSeccion(seccion) {
    let todasLasSecciones = document.querySelectorAll('.section');
    todasLasSecciones.forEach(sec => sec.classList.add('hidden'));

    document.getElementById(seccion).classList.remove('hidden');
}
