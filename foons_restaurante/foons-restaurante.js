document.addEventListener('DOMContentLoaded', () => {
  const botonMenu = document.getElementById('boton-navegacion');
  const navegacion = document.getElementById('navegacion');
  const pestanas = document.querySelectorAll('.pestana');
  const grupos = document.querySelectorAll('.grupo');
  const botonesVer = document.querySelectorAll('.boton-ver');
  const ventana = document.getElementById('ventana');
  const ventanaFondo = document.getElementById('ventana-fondo');
  const ventanaCerrar = document.getElementById('ventana-cerrar');
  const ventanaTitulo = document.getElementById('ventana-titulo');
  const ventanaDescripcion = document.getElementById('ventana-descripcion');
  const ventanaPrecio = document.getElementById('ventana-precio');
  const ventanaImagen = document.getElementById('ventana-imagen');
  const ventanaPedir = document.getElementById('ventana-pedir');
  const botonPedido = document.getElementById('boton-pedido');
  const nota = document.getElementById('nota');
  const botonReserva = document.getElementById('boton-reserva');
  const notaReserva = document.getElementById('nota-reserva');

  const convertirHoraReserva = (textoHora) => {
    const horaLimpia = textoHora.trim().toUpperCase();
    const coincidencia = horaLimpia.match(/^(1[0-2]|[1-9])(?::([0-5][0-9]))?\s*(AM|PM)$/);
    if (!coincidencia) return null;

    const hora12 = Number(coincidencia[1]);
    const minuto = Number(coincidencia[2] ?? '00');
    const periodo = coincidencia[3];
    let hora24 = hora12 % 12;
    if (periodo === 'PM') hora24 += 12;

    return {
      minutosTotales: hora24 * 60 + minuto,
      formato: `${hora12}:${String(minuto).padStart(2, '0')} ${periodo}`,
    };
  };

  const alternarNavegacion = () => {
    if (!navegacion || !botonMenu) return;
    const abierta = navegacion.classList.toggle('abierta');
    botonMenu.classList.toggle('abierto', abierta);
    botonMenu.setAttribute('aria-expanded', abierta ? 'true' : 'false');
  };

  botonMenu?.addEventListener('click', alternarNavegacion);
  document.querySelectorAll('.navegacion a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 900) {
        navegacion?.classList.remove('abierta');
        botonMenu?.classList.remove('abierto');
        botonMenu?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  pestanas.forEach((pestana) => {
    pestana.addEventListener('click', () => {
      const categoria = pestana.dataset.categoria;
      pestanas.forEach((item) => item.classList.remove('activa'));
      pestana.classList.add('activa');
      grupos.forEach((grupo) => {
        grupo.classList.toggle('activo', grupo.dataset.grupo === categoria);
      });
    });
  });

  const abrirModal = (boton) => {
    const producto = boton.closest('.producto');
    if (!producto || !ventana) return;

    ventanaTitulo.textContent = producto.dataset.nombre || 'Producto';
    ventanaDescripcion.textContent = producto.dataset.descripcion || 'Sin descripción disponible.';
    ventanaPrecio.textContent = producto.dataset.precio || '';
    ventanaPedir.href = `https://wa.me/573225234154?text=Hola%20Foons%20Restaurante%2C%20quiero%20pedir%20${encodeURIComponent(producto.dataset.nombre || '')}`;

    ventanaImagen.innerHTML = '';
    const imagen = producto.dataset.imagen;
    if (imagen) {
      const img = document.createElement('img');
      img.src = imagen;
      img.alt = producto.dataset.nombre || 'Producto';
      img.onerror = () => {
        ventanaImagen.innerHTML = '<span style="font-size: 2.2rem;">🍽️</span>';
      };
      ventanaImagen.appendChild(img);
    } else {
      ventanaImagen.innerHTML = '<span style="font-size: 2.2rem;">🍽️</span>';
    }

    ventana.classList.add('abierta');
    document.body.style.overflow = 'hidden';
  };

  const cerrarModal = () => {
    ventana?.classList.remove('abierta');
    document.body.style.overflow = '';
  };

  botonesVer.forEach((btn) => btn.addEventListener('click', () => abrirModal(btn)));
  ventanaFondo?.addEventListener('click', cerrarModal);
  ventanaCerrar?.addEventListener('click', cerrarModal);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') cerrarModal();
  });

  botonPedido?.addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const pago = document.getElementById('pago').value;
    const pedido = document.getElementById('pedido').value.trim();

    if (!nombre || !direccion || !pago || !pedido) {
      nota.textContent = 'Completa todos los campos para enviar tu pedido.';
      return;
    }

    const mensaje = `Hola Foons Restaurante, quiero hacer un pedido.%0A%0ANombre: ${encodeURIComponent(nombre)}%0ADirección: ${encodeURIComponent(direccion)}%0APago: ${encodeURIComponent(pago)}%0APedido: ${encodeURIComponent(pedido)}`;
    window.open(`https://wa.me/573225234154?text=${mensaje}`, '_blank', 'noopener');
    nota.textContent = 'Se abrió tu pedido en WhatsApp.';
  });

  botonReserva?.addEventListener('click', () => {
    const nombre = document.getElementById('reserva-nombre').value.trim();
    const telefono = document.getElementById('reserva-telefono').value.trim();
    const horaTexto = document.getElementById('reserva-hora').value.trim();
    const personas = document.getElementById('reserva-personas').value.trim();

    if (!nombre || !telefono || !horaTexto || !personas) {
      notaReserva.textContent = 'Completa todos los campos para enviar tu reserva.';
      return;
    }

    const horaReserva = convertirHoraReserva(horaTexto);
    if (!horaReserva) {
      notaReserva.textContent = 'Escribe la hora en formato 12 horas. Ejemplo: 7 PM o 7:30 PM.';
      return;
    }

    const inicioAtencion = 17 * 60 + 30;
    const finAtencion = 23 * 60;
    if (horaReserva.minutosTotales < inicioAtencion || horaReserva.minutosTotales > finAtencion) {
      notaReserva.textContent = 'Las reservas son de 5:30 PM a 11:00 PM.';
      return;
    }

    const mensaje = `Hola Foons Restaurante, quiero hacer una reserva.%0A%0ANombre: ${encodeURIComponent(nombre)}%0ATeléfono: ${encodeURIComponent(telefono)}%0AHora: ${encodeURIComponent(horaReserva.formato)}%0ACantidad de personas: ${encodeURIComponent(personas)}`;
    window.open(`https://wa.me/573225234154?text=${mensaje}`, '_blank', 'noopener');
    notaReserva.textContent = 'Se abrió tu reserva en WhatsApp.';
  });
});
