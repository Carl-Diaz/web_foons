// =============================================
// FOONS — INDEX SELECTOR
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    const conceptos = document.querySelectorAll('.concepto');

    // Efecto: cuando haces hover en un lado, el otro se oscurece levemente
    conceptos.forEach(concepto => {
        concepto.addEventListener('mouseenter', () => {
            conceptos.forEach(otro => {
                if (otro !== concepto) {
                    otro.style.filter = 'brightness(0.7)';
                    otro.style.transition = 'filter 0.4s ease';
                }
            });
        });

        concepto.addEventListener('mouseleave', () => {
            conceptos.forEach(otro => {
                otro.style.filter = '';
            });
        });

        // Accesibilidad — navegación por teclado
        concepto.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = concepto.getAttribute('href');
            }
        });
    });

    // Soporte táctil — feedback visual en móvil
    conceptos.forEach(concepto => {
        concepto.addEventListener('touchstart', () => {
            concepto.style.filter = 'brightness(0.9)';
        }, { passive: true });

        concepto.addEventListener('touchend', () => {
            concepto.style.filter = '';
        }, { passive: true });
    });

});