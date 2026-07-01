document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');
  const tabs = document.querySelectorAll('.tab');
  const grupos = document.querySelectorAll('.grupo');
  const verBtns = document.querySelectorAll('.ver-btn');
  const modal = document.getElementById('modal');
  const modalFondo = document.getElementById('modal-fondo');
  const modalCerrar = document.getElementById('modal-cerrar');
  const modalTitulo = document.getElementById('modal-titulo');
  const modalDescripcion = document.getElementById('modal-descripcion');
  const modalPrecio = document.getElementById('modal-precio');
  const modalImagen = document.getElementById('modal-imagen');
  const modalPedir = document.getElementById('modal-pedir');
  const botonPedido = document.getElementById('boton-pedido');
  const nota = document.getElementById('nota');

  const abrirMenu = () => {
    if (!menu || !menuBtn) return;
    const abierto = menu.classList.toggle('open');
    menuBtn.classList.toggle('open', abierto);
    menuBtn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  };

  menuBtn?.addEventListener('click', abrirMenu);
  document.querySelectorAll('.menu a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 900) {
        menu?.classList.remove('open');
        menuBtn?.classList.remove('open');
        menuBtn?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const categoria = tab.dataset.categoria;
      tabs.forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');
      grupos.forEach((grupo) => {
        grupo.classList.toggle('active', grupo.dataset.grupo === categoria);
      });
    });
  });

  const abrirModal = (boton) => {
    const producto = boton.closest('.producto');
    if (!producto || !modal) return;

    modalTitulo.textContent = producto.dataset.nombre || 'Producto';
    modalDescripcion.textContent = producto.dataset.descripcion || 'Sin descripción disponible.';
    modalPrecio.textContent = producto.dataset.precio || '';
    modalPedir.href = `https://wa.me/573225234154?text=Hola%20Foons%20Restaurante%2C%20quiero%20pedir%20${encodeURIComponent(producto.dataset.nombre || '')}`;

    modalImagen.innerHTML = '';
    const imagen = producto.dataset.imagen;
    if (imagen) {
      const img = document.createElement('img');
      img.src = imagen;
      img.alt = producto.dataset.nombre || 'Producto';
      img.onerror = () => {
        modalImagen.innerHTML = '<span style="font-size: 2.2rem;">🍽️</span>';
      };
      modalImagen.appendChild(img);
    } else {
      modalImagen.innerHTML = '<span style="font-size: 2.2rem;">🍽️</span>';
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const cerrarModal = () => {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  };

  verBtns.forEach((btn) => btn.addEventListener('click', () => abrirModal(btn)));
  modalFondo?.addEventListener('click', cerrarModal);
  modalCerrar?.addEventListener('click', cerrarModal);
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
});
