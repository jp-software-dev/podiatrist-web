document.addEventListener('DOMContentLoaded', () => {

    /* INICIO DEL SCRIPT AL CARGAR EL DOM */
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    /* LÓGICA DE APERTURA Y CIERRE DEL MENÚ MÓVIL */
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    /* CERRAR MENÚ AL SELECCIONAR UNA SECCIÓN */
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if(icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    /* CERRAR MENÚ AL HACER CLIC FUERA DE ÉL */
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    /* PREPARACIÓN DE ELEMENTOS PARA ANIMACIÓN REVEAL */
    const revealElements = document.querySelectorAll('.service-card, .section-header, .hero-text, .info-card');
    revealElements.forEach(el => el.classList.add('reveal'));

    /* CONFIGURACIÓN DEL OBSERVADOR DE INTERSECCIÓN */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* EFECTOS VISUALES DEL HEADER AL HACER SCROLL */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = "0 4px 20px rgba(45, 71, 57, 0.15)";
            header.style.padding = "10px 0";
        } else {
            header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.08)";
            header.style.padding = "15px 0";
        }
    });

    /* ACTUALIZACIÓN AUTOMÁTICA DEL AÑO EN EL FOOTER */
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});