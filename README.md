# Landing Page para Clínica Podológica

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

Sitio de una sola página (arquitectura esencial), profesional y responsivo, diseñado para una clínica podológica. Está enfocado en la conversión y ofrece una experiencia limpia, accesible y optimizada para pacientes que buscan atención especializada del pie.

## ✨ Características

* **Arquitectura de una sola página:** navegación fluida con JavaScript puro y desplazamiento suave entre las secciones principales (Inicio, Sobre mí, Servicios, Ubicación, Contacto) sin recargar la página.
* **Llamadas a la acción por WhatsApp:** integración directa con WhatsApp para que los pacientes agenden citas y envíen consultas al instante.
* **Diseño UI/UX para el sector salud:** estética limpia que transmite confianza, con microinteracciones sutiles en CSS y una distribución intuitiva.
* **Catálogo de servicios:** secciones que explican cada tratamiento, procedimiento y equipo podológico.
* **Ubicación y contacto interactivos:** mapa integrado y datos de contacto accesibles.
* **100% responsivo:** diseño *mobile-first* que se adapta a teléfonos, tabletas y escritorio.
* **Rendimiento optimizado:** imágenes WebP, video del hero alojado y comprimido, íconos reducidos a los que se usan y caché de larga duración. La página pasó de ~8.4 MB a ~0.66 MB en escritorio y ~0.47 MB en móvil.

## 🛠 Tecnologías

* **Frontend:** HTML5 semántico y CSS3 (propiedades personalizadas, Flexbox/Grid).
* **Scripts:** JavaScript puro (ES6+) para manipular el DOM y el desplazamiento suave.
* **Íconos:** Tabler Icons 2.47.0 (subconjunto alojado en el propio sitio).
* **Control de versiones:** Git y GitHub.
* **Hosting:** Vercel, con despliegue continuo desde la rama `main` de GitHub.

## 🚀 Instalación

Sigue estos pasos para ejecutar el proyecto en tu equipo:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jp-software-dev/podiatrist-web.git
   ```
2. Entra a la carpeta del proyecto:
   ```bash
   cd podiatrist-web
   ```
3. Abre `index.html` en tu navegador o sirve la carpeta con cualquier servidor estático, por ejemplo:
   ```bash
   npx serve .
   ```

No requiere compilación ni dependencias.

## 📁 Estructura del proyecto

```
podiatrist-web/
├── index.html                     # Estructura de la página
├── css/
│   ├── styles.css                 # Estilos y puntos de quiebre responsivos
│   └── tabler-icons-subset.css    # Solo los íconos de Tabler que usa el sitio
├── js/main.js                     # Navegación, desplazamiento suave y animaciones de aparición
├── public/
│   ├── icono_circular.ico
│   ├── fonts/                     # Fuente de íconos reducida (≈6 KB)
│   ├── images/                    # Imágenes WebP + PNG originales de respaldo
│   └── videos/                    # Video del hero (720p y 360p) y su póster WebP
└── vercel.json                    # Encabezados de caché para los recursos estáticos
```

## ⚡ Rendimiento

| Optimización | Detalle |
| --- | --- |
| Imágenes WebP | Calidad 85 y resolución original; ~21 MB de PNG reducidos a ~1.5 MB |
| Respaldo PNG | Solo lo descargan navegadores sin soporte WebP, así que no suma peso en navegadores actuales |
| Espacio reservado | `width` y `height` reales en cada `<img>` y en el video para evitar saltos de diseño (CLS) |
| Carga diferida | `loading="lazy"` y `decoding="async"` en todas las imágenes |
| Video del hero | Alojado en el sitio, sin pista de audio: 720p (~286 KB) en escritorio y 360p (~97 KB) en móvil, en lugar del original 2560×1440 de ~3.5 MB |
| Póster del hero | Primer cuadro del video en WebP (~43 KB), precargado con `fetchpriority="high"` |
| Íconos | Subconjunto de 25 íconos de Tabler (~6 KB) en lugar de la fuente completa (~760 KB) |
| Caché larga | `Cache-Control: public, max-age=31536000, immutable` para todo `/public` en Vercel |

### Agregar o reemplazar imágenes

1. Convierte la imagen a WebP (calidad 85, máximo 1600 px de ancho) y guarda el PNG original junto a ella.
2. Envuélvela en un `<picture>` con el `<source>` WebP primero y el `<img>` PNG como respaldo, con su `width` y `height` reales.
3. Usa un **nombre de archivo nuevo** al reemplazar una imagen o video: los recursos se guardan en caché por un año y, con el mismo nombre, los visitantes seguirían viendo la versión anterior.

### Agregar íconos

La fuente de íconos solo contiene los 25 que usa el sitio. Para usar uno nuevo de Tabler hay que regenerar `public/fonts/tabler-icons-subset.woff` y agregar su regla en `css/tabler-icons-subset.css`; si no, el ícono no se verá.

## 🚢 Despliegue

Cada push a `main` en GitHub publica automáticamente el sitio en Vercel. Los encabezados de caché están en `vercel.json` y solo aplican al despliegue de Vercel.
