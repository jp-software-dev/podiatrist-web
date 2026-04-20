/**
 * @version 1.0.0
 * @author Dr. en Podología Team
 * @license Proprietary
 * 
 * @description
 * Main interactions for podiatry clinic landing page.
 * Features: Mobile menu toggle, scroll spy, reveal animations,
 *           dynamic copyright year, WhatsApp link sanitization,
 *           header shadow on scroll, anti-debugging, anti-spam,
 *           content copy protection.
 * 
 * @dependencies
 * - Font Awesome 6.4.0 (external)
 * - Google Fonts (Poppins, Montserrat)
 * 
 * @notes
 * - All selectors use class-based DOM queries.
 * - Non-breaking changes only: no existing logic altered.
 */

// SECURITY: WhatsApp number sanitization - Prevents javascript: injection and ensures only digits
(function sanitizeWhatsAppLink() {
    const waBtn = document.querySelector('.whatsapp-btn');
    if (waBtn && waBtn.dataset.waNumber) {
        const rawNumber = waBtn.dataset.waNumber;
        const sanitized = rawNumber.replace(/\D/g, '');
        if (sanitized.length >= 10 && sanitized.length <= 15) {
            waBtn.href = `https://wa.me/${sanitized}`;
        } else {
            console.warn('Web Performance: Invalid WhatsApp number format');
        }
    }
})();

// ANTI-DEBUGGING: Detect DevTools and warn (non-breaking, purely informational)
(function detectDevTools() {
    let devToolsOpen = false;
    const element = new Image();
    
    Object.defineProperty(element, 'id', {
        get: function() {
            devToolsOpen = true;
            console.warn('Security: Developer tools detected. This is for informational purposes only.');
            return '';
        }
    });
    
    setInterval(() => {
        devToolsOpen = false;
        console.log(element);
        console.clear();
        if (devToolsOpen) {
            const warningDiv = document.createElement('div');
            warningDiv.style.cssText = 'position:fixed; bottom:10px; right:10px; background:#ff9800; color:#000; padding:5px 10px; font-size:12px; border-radius:5px; z-index:9999; font-family:monospace; opacity:0.7; pointer-events:none;';
            warningDiv.textContent = '🔍 DevTools detected';
            if (!document.querySelector('.devtools-warning')) {
                warningDiv.classList.add('devtools-warning');
                document.body.appendChild(warningDiv);
                setTimeout(() => warningDiv.remove(), 3000);
            }
        }
    }, 1000);
})();

// ANTI-SPAM: Deobfuscate contact info on click only
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

// CONTENT PROTECTION: Warn when copying content and add attribution
document.addEventListener('copy', (e) => {
    const selection = window.getSelection().toString();
    if (selection.length > 20) {
        console.warn('Content copy detected. Please respect copyright.');
        e.clipboardData.setData('text/plain', selection + '\n\nFuente: Clínica Podológica - Dr. en Podología');
        e.preventDefault();
    }
});

// OPTIONAL: Disable right-click context menu on specific elements
document.querySelectorAll('.service-card, .info-card, .hero').forEach(el => {
    el.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});

// Hamburger menu for mobile devices
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

// Close menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Highlight active link on scroll (Scroll Spy)
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

// Reveal animation on scroll
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

window.addEventListener('scroll', reveal);
// Add reveal class to elements we want to animate (e.g., service-card, info-card)
document.querySelectorAll('.service-card, .info-card, .section-header').forEach(el => {
  el.classList.add('reveal');
});
// Run once on load to show initially visible elements
reveal();

// Dynamic current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// UX Micro-interaction: Add shadow on header scroll - Provides visual feedback when user scrolls past hero section
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});