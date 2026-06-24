// Inicializa la aplicación cuando el DOM está completamente cargado y analizado
document.addEventListener('DOMContentLoaded', () => {
    // 1Inicializa las animaciones de GSAP y los plugins de ScrollTrigger si están disponibles
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initAnimations();
    }

    // Adjunta el listener de scroll para la gestión del estado del header
    initHeaderScroll();

    // Configura las interacciones de navegación móvil
    initMobileMenu();

    // Sanitiza y formatea el enlace de integración de WhatsApp
    sanitizeWhatsAppLink();

    // Inicializa el scroll spy para el resaltado dinámico de la navegación
    initScrollSpy();

    // Aplica la protección de contenido y anulaciones de enlaces de contacto
    initContactProtections();

    // Inicializa el script de monitoreo de DevTools
    detectDevTools();

    // Inyecta dinámicamente el año actual en el copyright del pie de página
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Orquesta las líneas de tiempo de GSAP para la sección hero y las revelaciones al hacer scroll
function initAnimations() {
    // Sección Hero: Línea de tiempo de entrada escalonada
    const heroTl = gsap.timeline();
    
    heroTl.to('.hero-title', { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' })
          .to('.hero-subtitle', { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, '-=0.8')
          .to('.hero-buttons', { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, '-=0.8')
          .to('.hero-stats', { opacity: 1, x: 0, duration: 1.2, ease: 'power4.out' }, '-=1');

    // Revelación de contenido: Adjunta ScrollTrigger a todos los elementos con la clase '.reveal'
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

// Alterna el estilo del fondo del header basado en la profundidad de la posición del scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Escucha los eventos de scroll y ejecuta la comprobación inicial
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
}

// Gestiona el estado del menú hamburguesa móvil y la alternancia del icono
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const icon = menuToggle?.querySelector('i');

    if (menuToggle && navMenu) {
        // Alterna los estados del menú y del icono al hacer clic en el botón
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            if (icon) {
                icon.classList.toggle('ti-menu-2');
                icon.classList.toggle('ti-x');
            }
        });

        // Cierra automáticamente el menú cuando se hace clic en un enlace de navegación
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (icon) {
                    icon.classList.add('ti-menu-2');
                    icon.classList.remove('ti-x');
                }
            });
        });
    }
}

// Limpia los caracteres no numéricos del atributo de datos sin procesar para construir una URL de WhatsApp válida
function sanitizeWhatsAppLink() {
    const waBtn = document.querySelector('.whatsapp-float');
    if (waBtn && waBtn.dataset.waNumber) {
        const rawNumber = waBtn.dataset.waNumber;
        const sanitized = rawNumber.replace(/\D/g, ''); 
        
        // Asegura una longitud de número de teléfono válida antes de aplicar el href
        if (sanitized.length >= 10 && sanitized.length <= 15) {
            waBtn.href = `https://wa.me/${sanitized}`;
        }
    }
}

// Observa las secciones activas en la ventana para resaltar los enlaces de la barra de navegación correspondientes
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        // Determina qué sección está actualmente a la vista
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Lógica de compensación (150px) para activar el espía justo antes de que la sección llegue a la parte superior
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        // Actualiza la clase activa en los elementos de navegación coincidentes
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Maneja el enrutamiento explícito para los datos de contacto y aplica disuasivos básicos contra la extracción de contenido
function initContactProtections() {
    // Intercepta eventos de clic para el enrutamiento semántico de contactos
    const phoneLink = document.getElementById('phoneLink');
    const emailLink = document.getElementById('emailLink');

    if (phoneLink) {
        phoneLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'tel:+527211001122';
        });
    }

    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'mailto:Consultorio@gmail.com';
        });
    }

    // Añade la atribución de la fuente a los datos copiados al portapapeles que excedan los 20 caracteres
    document.addEventListener('copy', (e) => {
        const selection = window.getSelection().toString();
        if (selection.length > 20) {
            e.clipboardData.setData('text/plain', selection + '\n\nFuente: Clínica Podológica - Dr. en Podología');
            e.preventDefault();
        }
    });

    // Desactiva el menú contextual nativo (clic derecho) en elementos críticos de la interfaz
    document.querySelectorAll('.service-card, .info-card, .hero').forEach(el => {
        el.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
    });
}

// Mecanismo de sondeo para detectar si Chrome/Edge DevTools está abierto mediante la ejecución de un getter de objeto
function detectDevTools() {
    let devToolsOpen = false;
    const element = new Image();
    
    // El getter se dispara cuando la consola intenta evaluar/renderizar el objeto
    Object.defineProperty(element, 'id', {
        get: function() {
            devToolsOpen = true;
            console.warn('Alerta: Developer tools detectadas.');
            return '';
        }
    });
    
    // Comprobación de intervalo cada segundo
    setInterval(() => {
        devToolsOpen = false;
        console.log(element);
        console.clear();
        
        // Inyecta una superposición de advertencia visual en el DOM si DevTools está activo
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