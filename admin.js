document.addEventListener("DOMContentLoaded", () => {
  // Botones y formularios
  const btnTroquelado = document.getElementById("btn-troquelado");
  const btnArmado = document.getElementById("btn-armado");
  const btnCerrado = document.getElementById("btn-cerrado");
  const btnVolteado = document.getElementById("btn-volteado");
  const btnStock = document.getElementById("btn-stock");

  const seccionTroquelado = document.getElementById("seccion-troquelado");
  const seccionArmado = document.getElementById("seccion-armado");
  const seccionCerrado = document.getElementById("seccion-cerrado");
  const seccionVolteado = document.getElementById("seccion-volteado");
  const seccionStock = document.getElementById("seccion-stock");

  const formularioTroquelado = document.getElementById("form-troquelado");
  const btnEnviarTroquelado = document.getElementById("btn-enviar-troquelado");

  // Mostrar secciones al hacer clic
  function ocultarSecciones() {
    seccionTroquelado.style.display = "none";
    seccionArmado.style.display = "none";
    seccionCerrado.style.display = "none";
    seccionVolteado.style.display = "none";
    seccionStock.style.display = "none";
  }

  btnTroquelado?.addEventListener("click", () => {
    ocultarSecciones();
    seccionTroquelado.style.display = "block";
  });

  btnArmado?.addEventListener("click", () => {
    ocultarSecciones();
    seccionArmado.style.display = "block";
  });

  btnCerrado?.addEventListener("click", () => {
    ocultarSecciones();
    seccionCerrado.style.display = "block";
  });

  btnVolteado?.addEventListener("click", () => {
    ocultarSecciones();
    seccionVolteado.style.display = "block";
  });

  btnStock?.addEventListener("click", () => {
    ocultarSecciones();
    seccionStock.style.display = "block";
  });

  // Función para registrar troquelado
  formularioTroquelado?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const referencia = document.getElementById("referencia").value;
    const cantidad = document.getElementById("cantidad").value;
    const fecha = new Date().toLocaleDateString("es-ES");

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby2UsuCuIa2TKpJ9xmZuSRi4Bd5w747ScS8bsUy_bMt70U2aNoGWVDhVQsoWG-gOf7j/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            proceso: "troquelado",
            referencia,
            cantidad,
            fecha,
            enviado: "No",
            destino: "",
          }),
        }
      );

      const data = await response.json();
      alert("✅ Registrado correctamente");
      formularioTroquelado.reset();
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("❌ Error al registrar. Verifica tu conexión o intenta más tarde.");
    }
  });
});
