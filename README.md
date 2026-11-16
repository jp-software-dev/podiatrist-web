<div align="center">

# 🦶 Clínica Podológica — Landing Page

**Sitio de una sola página para una clínica de podología clínica avanzada, enfocado en conversión, confianza y rendimiento.**

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![GSAP](https://img.shields.io/badge/gsap-%2388CE02.svg?style=for-the-badge&logo=greensock&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

![Peso escritorio](https://img.shields.io/badge/peso%20escritorio-659%20KB-2ea44f?style=flat-square)
![Peso móvil](https://img.shields.io/badge/peso%20m%C3%B3vil-470%20KB-2ea44f?style=flat-square)
![Reducción](https://img.shields.io/badge/reducci%C3%B3n-%E2%88%9292%25-2ea44f?style=flat-square)
![Sin build](https://img.shields.io/badge/build-no%20requerido-informational?style=flat-square)

</div>

---

## 📑 Contenido

- [Descripción](#-descripción)
- [Características](#-características)
- [Rendimiento](#-rendimiento)
- [Tecnologías](#-tecnologías)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Instalación y uso local](#-instalación-y-uso-local)
- [Guía de mantenimiento](#-guía-de-mantenimiento)
- [Despliegue](#-despliegue)
- [Convención de commits](#-convención-de-commits)
- [Autor](#-autor)

---

## 📌 Descripción

Landing page profesional y responsiva para una clínica podológica. Presenta al especialista, su catálogo de tratamientos, la ubicación de la clínica y canales de contacto directo, con el objetivo de convertir visitas en citas agendadas por WhatsApp.

El proyecto sigue una **arquitectura esencial**: HTML, CSS y JavaScript puros, sin frameworks ni proceso de compilación, lo que facilita el mantenimiento y garantiza tiempos de carga mínimos.

## ✨ Características

| | Característica | Descripción |
| --- | --- | --- |
| 🧭 | **Una sola página** | Navegación con desplazamiento suave entre Inicio, Sobre mí, Servicios, Ubicación y Contacto, sin recargas. |
| 💬 | **Conversión por WhatsApp** | Botón flotante y llamadas a la acción que abren una conversación directa para agendar citas. |
| 🎬 | **Hero con video** | Video de fondo ligero con superposición degradada que mantiene la legibilidad del texto. |
| 🩺 | **Catálogo de servicios** | Diez tratamientos presentados en filas editoriales con imagen, descripción y beneficios. |
| 👨‍⚕️ | **Sección "Sobre mí"** | Perfil del especialista con fotografía, formación, especialización y experiencia profesional. |
| 📍 | **Ubicación interactiva** | Mapa integrado y datos de contacto accesibles. |
| ✨ | **Animaciones de aparición** | Efectos sutiles al hacer scroll con GSAP y ScrollTrigger. |
| 📱 | **100% responsivo** | Diseño *mobile-first* que se adapta a teléfonos, tabletas y escritorio. |

## ⚡ Rendimiento

Mediciones con Chrome sobre el sitio servido en local, con caché deshabilitada:

| Métrica | Antes | Ahora | Mejora |
| --- | ---: | ---: | ---: |
| Peso total — escritorio | 8.4 MB | **659 KB** | −92% |
| Peso total — móvil | 6.3 MB | **470 KB** | −93% |
| Imágenes (10) | ~21 MB | ~1.5 MB | −93% |
| Video del hero | 3.5 MB | 286 KB / 97 KB | −92% / −97% |
| Fuente de íconos | 760 KB | 6 KB | −99% |

> Las mediciones de LCP se hicieron sin simular una red lenta. Para valores reales, ejecuta [PageSpeed Insights](https://pagespeed.web.dev/) sobre la URL de producción.

### Técnicas aplicadas

- **Imágenes WebP** (calidad 85, resolución original) servidas con `<picture>` y el PNG original como respaldo para navegadores sin soporte.
- **Dimensiones reales** (`width` / `height`) en cada imagen y en el video para reservar su espacio y evitar saltos de diseño (CLS).
- **Carga diferida** con `loading="lazy"` y `decoding="async"` en todas las imágenes.
- **Video del hero alojado en el sitio**, sin pista de audio, en dos resoluciones: 720p para escritorio y 360p para móvil (`<source media>`).
- **Póster WebP** del primer cuadro del video, precargado con `fetchpriority="high"` para acelerar el LCP.
- **Subconjunto de íconos**: la fuente de Tabler Icons contiene solo los 25 íconos que usa el sitio.
- **Caché de larga duración** (`max-age=31536000, immutable`) para todos los recursos de `/public` en Vercel.

## 🛠 Tecnologías

| Área | Herramienta |
| --- | --- |
| Estructura | HTML5 semántico |
| Estilos | CSS3 — propiedades personalizadas, Flexbox y Grid |
| Interacción | JavaScript puro (ES6+) |
| Animaciones | GSAP 3 + ScrollTrigger |
| Íconos | Tabler Icons 2.47.0 (subconjunto alojado) |
| Tipografía | Montserrat y Open Sans (Google Fonts) |
| Control de versiones | Git y GitHub |
| Hosting | Vercel (despliegue continuo desde `main`) |

## 📁 Estructura del proyecto

```
podiatrist-web/
├── index.html                     # Estructura de la página
├── css/
│   ├── styles.css                 # Estilos y puntos de quiebre responsivos
│   └── tabler-icons-subset.css    # Reglas de los íconos de Tabler usados en el sitio
├── js/
│   └── main.js                    # Navegación, desplazamiento suave y animaciones
├── public/
│   ├── icono_circular.ico         # Favicon
│   ├── fonts/                     # Fuente de íconos reducida (~6 KB)
│   ├── images/                    # Imágenes WebP + PNG originales de respaldo
│   └── videos/                    # Video del hero (720p y 360p) y su póster WebP
├── vercel.json                    # Encabezados de caché para recursos estáticos
└── README.md
```

## 🚀 Instalación y uso local

**Requisitos:** un navegador moderno. Node.js es opcional, solo para levantar un servidor local.

```bash
# 1. Clonar el repositorio
git clone https://github.com/jp-software-dev/podiatrist-web.git

# 2. Entrar a la carpeta
cd podiatrist-web

# 3. Levantar un servidor estático (o abrir index.html directamente)
npx serve .
```

No hay dependencias que instalar ni proceso de compilación.

## 🧰 Guía de mantenimiento

### Agregar o reemplazar imágenes

1. Convierte la imagen a **WebP** (calidad 85, máximo 1600 px de ancho) y conserva el PNG original junto a ella en `public/images/`.
2. Insértala con `<picture>`, el `<source>` WebP primero y el `<img>` PNG como respaldo:

   ```html
   <picture>
     <source srcset="public/images/Nombre.webp" type="image/webp">
     <img src="public/images/Nombre.png" alt="Descripción" width="1402" height="1122" loading="lazy" decoding="async">
   </picture>
   ```

3. Usa siempre `width` y `height` reales de la imagen.

### Reemplazar el video del hero

1. Exporta dos versiones en MP4 (H.264) **sin audio**: 1280×720 y 640×360.
2. Extrae el primer cuadro y guárdalo como póster WebP.
3. Colócalos en `public/videos/` con **nombres nuevos** y actualiza las rutas en `index.html` (video, `<source>` y `<link rel="preload">`).

### Agregar íconos

La fuente de íconos solo incluye los 25 que usa el sitio. Para añadir uno nuevo de [Tabler Icons](https://tabler.io/icons) hay que regenerar `public/fonts/tabler-icons-subset.woff` incluyendo su código y agregar su regla en `css/tabler-icons-subset.css`. Si no se hace, el ícono no se mostrará.

### Caché y nombres de archivo

Los recursos de `/public` se guardan en el navegador durante **un año**. Al reemplazar una imagen, video o fuente, **cambia el nombre del archivo**; si se reutiliza el mismo nombre, los visitantes seguirán viendo la versión anterior.

## 🚢 Despliegue

El sitio se publica en **Vercel** con despliegue continuo:

1. Cada push a `main` en GitHub genera un nuevo despliegue automáticamente.
2. Los encabezados de caché se definen en `vercel.json` y solo aplican al despliegue de Vercel.

```json
{
  "headers": [
    {
      "source": "/public/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

## 📝 Convención de commits

El historial sigue [Conventional Commits](https://www.conventionalcommits.org/es/):

| Prefijo | Uso |
| --- | --- |
| `feat` | Nueva funcionalidad o sección |
| `fix` | Corrección de errores |
| `perf` | Mejoras de rendimiento |
| `style` | Cambios visuales o de estilos sin alterar la lógica |
| `docs` | Documentación |

## 👤 Autor

**Juan Pablo Mercado** — [@jp-software-dev](https://github.com/jp-software-dev)
