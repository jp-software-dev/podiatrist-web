// Función autoejecutable para la sanitización del enlace de WhatsApp
// Extrae únicamente los números del atributo del botón para asegurar que el enlace de 'wa.me' sea válido y no contenga caracteres erróneos.
(function sanitizeWhatsAppLink() {
    const waBtn = document.querySelector('.whatsapp-btn');
    if (waBtn && waBtn.dataset.waNumber) {
        const rawNumber = waBtn.dataset.waNumber;
        const sanitized = rawNumber.replace(/\D/g, ''); // Elimina todo lo que no sea dígito
        if (sanitized.length >= 10 && sanitized.length <= 15) {
            waBtn.href = `https://wa.me/${sanitized}`;
        } else {
            console.warn('Formato de WhatsApp inválido');
        }
    }
})();

// Función autoejecutable para la detección de herramientas de desarrollador (DevTools)
// Crea un elemento imagen vacío y un intervalo que revisa si el usuario tiene abierta la consola del navegador, mostrando una alerta temporal.
(function detectDevTools() {
    let devToolsOpen = false;
    const element = new Image();
    
    // Al intentar leer el ID de la imagen en consola, se dispara este evento
    Object.defineProperty(element, 'id', {
        get: function() {
            devToolsOpen = true;
            console.warn('Alerta: Developer tools detectadas.');
            return '';
        }
    });
    
    // Intervalo de comprobación cada segundo
    setInterval(() => {
        devToolsOpen = false;
        console.log(element);
        console.clear();
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
})();

// Protección Anti-Spam para enlaces de contacto
// Oculta la información de contacto real de los bots en el HTML inicial. Cuando un usuario humano hace clic, se ejecuta la redirección real ('tel:' o 'mailto:').
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

// Protección de Contenido: Atribución automática al copiar
// Intercepta el evento de copia de texto. Si el usuario copia más de 20 caracteres, añade automáticamente una firma con la fuente de la página al portapapeles.
document.addEventListener('copy', (e) => {
    const selection = window.getSelection().toString();
    if (selection.length > 20) {
        console.warn('Copia detectada.');
        e.clipboardData.setData('text/plain', selection + '\n\nFuente: Clínica Podológica - Dr. en Podología');
        e.preventDefault(); // Previene la copia normal para inyectar nuestra versión
    }
});

// Desactiva el clic derecho en elementos visuales clave (protección anticopia básica)
// Aplica para las tarjetas de servicios, información y la sección principal (hero).
document.querySelectorAll('.service-card, .info-card, .hero').forEach(el => {
    el.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});

// Lógica para el menú de hamburguesa en versión móvil
// Despliega u oculta el panel lateral de navegación intercambiando los íconos de "hamburguesa" a "X".
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// Cierra automáticamente el menú móvil cuando el usuario hace clic en algún enlace
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Scroll Spy: Resalta el enlace activo en la barra de navegación (navbar) según la sección visible
// Calcula la altura de la página y detecta en qué sección se encuentra el usuario para iluminar su respectivo enlace en el menú superior.
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Animación al hacer scroll (Efecto Reveal/Aparición)
// A medida que el usuario baja por la página, evalúa si los elementos con la clase '.reveal' entran en pantalla para activarlos mediante CSS y generar un efecto de aparición suave.
function reveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 150;
    
    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}

// Ejecuta la animación de revelar en el momento de cargar y prepara las tarjetas para el efecto
window.addEventListener('scroll', reveal);
document.querySelectorAll('.service-card, .info-card, .section-header').forEach(el => {
  el.classList.add('reveal');
});
reveal();

// Actualización de año dinámico en el texto del Footer (Pie de página)
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Agrega una clase que genera sombra en el Header (Cabecera) cuando el usuario baja en la página
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});