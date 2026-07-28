/* --- CONFIGURACIÓN GLOBAL --- */
const CONTACT_PHONE_NUMBER = 'TU-NUMERO-DE-CONTACTO';

/* Inicializa la aplicación cuando el DOM está completamente cargado y analizado */
document.addEventListener('DOMContentLoaded', () => {
    
    /* Inicializa las animaciones de GSAP y los plugins de ScrollTrigger si están disponibles */
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initAnimations();
    }

    /* Adjunta el listener de scroll para la gestión del estado del header */
    initHeaderScroll();

    /* Habilita el desplazamiento suave hacia las secciones al hacer clic en enlaces internos */
    initSmoothScroll();

    /* Configura las interacciones de navegación móvil */
    initMobileMenu();

    /* Sanitiza y formatea el enlace de integración de WhatsApp */
    sanitizeWhatsAppLink();

    /* Inicializa el scroll spy para el resaltado dinámico de la navegación */
    initScrollSpy();

    /* Aplica la protección de contenido y anulaciones de enlaces de contacto */
    initContactProtections();

    /* Inicializa el script de monitoreo de DevTools */
    detectDevTools();

    /* Inyecta dinámicamente el año actual en el copyright del pie de página */
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* Orquesta las líneas de tiempo de GSAP para la sección hero y las revelaciones al hacer scroll */
function initAnimations() {
    /* Sección Hero: Línea de tiempo de entrada escalonada para títulos y estadísticas */
    const heroTl = gsap.timeline();
    
    heroTl.to('.hero-title', { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' })
          .to('.hero-subtitle', { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, '-=0.8')
          .to('.hero-buttons', { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, '-=0.8')
          .to('.hero-stats', { opacity: 1, x: 0, duration: 1.2, ease: 'power4.out' }, '-=1');

    /* Revelación de contenido: Adjunta ScrollTrigger a todos los elementos con la clase '.reveal' */
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%', 
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
}

/* Alterna el estilo del fondo del header basado en la profundidad de la posición del scroll */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    /* Escucha los eventos de scroll y ejecuta la comprobación inicial */
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
}

/* Intercepta clics en enlaces de anclaje internos (navbar, footer, CTAs) para desplazamiento suave */
function initSmoothScroll() {
    const header = document.querySelector('.header');
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            /* Compensa la altura variable del header fijo (cambia al aplicar la clase 'scrolled') */
            const headerOffset = header ? header.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

            window.scrollTo({ top: targetPosition, behavior: 'smooth' });

            /* Actualiza la URL con el hash de la sección sin provocar un salto brusco */
            if (history.pushState) {
                history.pushState(null, '', href);
            }
        });
    });
}

/* Gestiona el estado del menú hamburguesa móvil y la alternancia del icono */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const icon = menuToggle?.querySelector('i');

    if (menuToggle && navMenu) {
        /* Alterna los estados del panel lateral y cambia a ícono X al hacer clic */
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            if (icon) {
                icon.classList.toggle('ti-menu-2');
                icon.classList.toggle('ti-x');
            }
        });

        /* Cierra automáticamente el menú móvil cuando se hace clic en un enlace a otra sección */
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (icon) {
                    icon.classList.add('ti-menu-2');
                    icon.classList.remove('ti-x');
                }
            });
        });

        /* Cierra el menú automáticamente cuando el usuario hace scroll */
        window.addEventListener('scroll', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (icon) {
                    icon.classList.add('ti-menu-2');
                    icon.classList.remove('ti-x');
                }
            }
        });
    }
}

/* Limpia los caracteres no numéricos del dataset sin procesar para construir URL de WhatsApp válida */
function sanitizeWhatsAppLink() {
    const waBtn = document.querySelector('.whatsapp-float');
    if (waBtn) {
        const sanitized = CONTACT_PHONE_NUMBER.replace(/\D/g, '');
        
        if (sanitized.length >= 10 && sanitized.length <= 15) {
            /* Si hay un número válido, configura el enlace a WhatsApp */
            const message = "Hola, Dr. Me gustaría agendar una cita. ¿Podría informarme sobre su disponibilidad?";
            const encodedMessage = encodeURIComponent(message);
            waBtn.href = `https://wa.me/${sanitized}?text=${encodedMessage}`;
            waBtn.setAttribute('target', '_blank');
            waBtn.setAttribute('rel', 'noopener noreferrer');
            waBtn.setAttribute('aria-label', 'Contactar por WhatsApp');
        } else {
            /* Si no hay número, el botón lleva a la sección de contacto */
            waBtn.href = '#contacto';
            waBtn.removeAttribute('target');
            waBtn.removeAttribute('rel');
            waBtn.setAttribute('aria-label', 'Ir a la sección de contacto');
        }
    }
}

/* Observa las secciones visibles para resaltar los enlaces de la barra de navegación correspondientes */
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        /* Determina qué sección está actualmente cruzando el umbral de la pantalla */
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            /* Lógica de compensación para activar el menú antes de llegar hasta arriba */
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        /* Borra estado activo previo y marca el enlace asociado al ID actual detectado */
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

/* Maneja el enrutamiento semántico y aplica disuasivos básicos contra copiado de contenido */
function initContactProtections() {
    const phoneLink = document.getElementById('phoneLink');
    const emailLink = document.getElementById('emailLink');

    /* Intercepta eventos de clic para disparar llamadas sin revelar la etiqueta base a bots simples */
    if (phoneLink) {
        phoneLink.addEventListener('click', (e) => {
            const sanitized = CONTACT_PHONE_NUMBER.replace(/\D/g, '');
            if (sanitized.length >= 10 && sanitized.length <= 15) {
                e.preventDefault();
                window.location.href = `tel:${CONTACT_PHONE_NUMBER}`;
            }
            /* Si no es un número válido, no hace nada y permite que el enlace href="#contacto" funcione */
        });
    }

    /* Intercepta eventos para abrir aplicación de correos predeterminada */
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'mailto:contacto@tudominio.com';
        });
    }

    /* Añade la atribución "Fuente:" a los datos copiados al portapapeles grandes */
    document.addEventListener('copy', (e) => {
        const selection = window.getSelection().toString();
        if (selection.length > 20) {
            e.clipboardData.setData('text/plain', selection + '\n\nFuente: Clínica Podológica - Dr. en Podología');
            e.preventDefault();
        }
    });

    /* Desactiva el menú nativo (clic derecho) para dificultar descarga de imágenes de interfaz */
    document.querySelectorAll('.service-card, .info-card, .hero').forEach(el => {
        el.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
    });
}

/* Mecanismo de sondeo usando getters para detectar si la consola DevTools está siendo ejecutada */
function detectDevTools() {
    let devToolsOpen = false;
    const element = new Image();
    
    /* El getter se dispara cuando el navegador renderiza el objeto oculto en la consola */
    Object.defineProperty(element, 'id', {
        get: function() {
            devToolsOpen = true;
            console.warn('Alerta: Developer tools detectadas.');
            return '';
        }
    });
    
    /* Comprobación de intervalo cada segundo limpiando consola para reactivar lectura */
    setInterval(() => {
        devToolsOpen = false;
        console.log(element);
        console.clear();
        
        /* Inyecta una superposición de advertencia en el DOM si el panel de desarrollador está activo */
        if (devToolsOpen) {
            const warningDiv = document.createElement('div');
            warningDiv.style.cssText = 'position:fixed; bottom:10px; right:10px; background:#ff9800; color:#000; padding:5px 10px; font-size:12px; border-radius:5px; z-index:9999; font-family:monospace; opacity:0.7; pointer-events:none;';
            warningDiv.textContent = '🔍 DevTools detectado';
            
            if (!document.querySelector('.devtools-warning')) {
                warningDiv.classList.add('devtools-warning');
                document.body.appendChild(warningDiv);
                setTimeout(() => warningDiv.remove(), 3000);
            }
        }
    }, 1000);
}