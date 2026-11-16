# Podiatry Clinic Landing Page

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

A professional, responsive single-page application (Essential Architecture) designed specifically for a podiatry clinic. This web project focuses on high conversion rates, providing a clean, accessible, and highly optimized user experience for patients looking for specialized foot care services.

## ✨ Features

* **Essential Single-Page Architecture:** Streamlined navigation flow with custom vanilla JavaScript implementation for fluid smooth-scrolling between core sections (Home, Services, Location, Contact) without page reloads.
* **High-Conversion CTAs (WhatsApp):** Direct integration with WhatsApp to eliminate friction, allowing patients to instantly schedule appointments and send inquiries.
* **Modern UI/UX for Healthcare:** Clean, trust-building design tailored for the medical sector, featuring subtle CSS micro-interactions and an intuitive layout.
* **Service Showcase:** Detailed, card-based sections clearly explaining various podiatry treatments, procedures, and medical equipment.
* **Interactive Location & Contact:** Embedded interactive maps for seamless clinic navigation and highly accessible contact data points.
* **100% Responsive Design:** Mobile-first layout engineered to adapt flawlessly across all smartphone, tablet, and desktop viewports.
* **Optimized Image Delivery:** Service and profile images are served as WebP (quality 85) through `<picture>` elements with the original PNG as a fallback, cutting image weight from ~21 MB to ~1.5 MB.
* **Stable Layout Loading:** Every image declares its real `width` and `height` to reserve space and prevent layout shifts (CLS), and uses `loading="lazy"` + `decoding="async"`; the hero video poster is preloaded with `fetchpriority="high"` to improve LCP.
* **Long-Term Asset Caching:** `vercel.json` serves everything under `/public` (images, icons and any local video) with `Cache-Control: public, max-age=31536000, immutable`. When replacing an asset, give it a new file name so browsers fetch the new version.

## 🛠 Technologies Used

* **Frontend:** Semantic HTML5, CSS3 (Custom properties, Flexbox/Grid).
* **Scripting:** Vanilla JavaScript (ES6+) for DOM manipulation and smooth scroll routing.
* **Version Control:** Git & GitHub.
* **Hosting:** Vercel (continuous deployment from the `main` branch on GitHub).

## 🚀 Installation & Setup

Follow these steps to deploy the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/jp-software-dev/podiatrist-web.git
   ```
2. Enter the project folder:
   ```bash
   cd podiatrist-web
   ```
3. Open `index.html` in your browser, or serve the folder with any static server, for example:
   ```bash
   npx serve .
   ```

No build step or dependencies are required.

## 📁 Project Structure

```
podiatrist-web/
├── index.html           # Single-page markup
├── css/styles.css       # Styles and responsive breakpoints
├── js/main.js           # Navigation, smooth scroll and reveal effects
├── public/
│   ├── icono_circular.ico
│   └── images/          # WebP images + original PNG fallbacks
└── vercel.json          # Cache headers for static assets
```

## ⚡ Performance

| Optimization | Detail |
| --- | --- |
| WebP images | Quality 85, original resolution; ~21 MB of PNG reduced to ~1.5 MB |
| PNG fallback | Served only to browsers without WebP support, so it adds no weight for modern browsers |
| Reserved space | Real `width` / `height` on every `<img>` to avoid layout shifts (CLS) |
| Lazy loading | `loading="lazy"` and `decoding="async"` on all images |
| Hero priority | Video poster preloaded with `fetchpriority="high"` to improve LCP |
| Long-term cache | `Cache-Control: public, max-age=31536000, immutable` for `/public` on Vercel |

### Adding or replacing images

1. Convert the image to WebP (quality 85, max 1600px wide) and keep the original PNG next to it.
2. Wrap it in a `<picture>` with the WebP `<source>` first and the PNG `<img>` as fallback, including its real `width` and `height`.
3. Use a **new file name** when replacing an image: assets are cached for one year, so reusing a name would keep showing the old version.

## 🚢 Deployment

Every push to `main` on GitHub triggers an automatic deployment on Vercel. Cache headers are defined in `vercel.json` and only apply to the Vercel deployment.
