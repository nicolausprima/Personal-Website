# Nicolaus Prima — Brand & Logo Guidelines
**Brand Identity & Design System • Convergence Tensor Mark**

---

## 1. Concept & Symbol Rationale

**Name:** Nicolaus Prima  
**Mark:** *The Convergence Tensor (Isometric N-Fold)*  
**Discipline:** Applied Data Science, Machine Learning, Quantitative Analytics, Full-stack Web.

### Visual Architecture
The Convergence Tensor mark is derived from the core thesis of applied data science: **Transforming raw multi-dimensional data noise into structured, decisive clarity**.

- **Three Isometric Facets:** Represent multidimensional tensors, matrix columns, and analytical features.
- **Dynamic Fold:** An origami-like dimensional ribbon connects the left pillar, sweeps upward across the central plane, and folds down the right column—forming a bold, modern **N** glyph in the positive geometry while evoking **P** through the right-side crown notch.
- **Symmetry & Precision:** Built with 30°/60°/90° isometric projection and zero curves, ensuring razor-sharp rendering on raster screens, high-DPI retina displays, and small 16px favicon tabs.

---

## 2. Color System

| Role | Color Name | HEX | RGB | Use Case |
|---|---|---|---|---|
| **Primary Ink** | Deep Slate | `#1C1C1C` | `28, 28, 28` | Light mode mark, primary typography |
| **Canvas Light** | Stone Cream | `#F7F5F2` | `247, 245, 242` | Portfolio light background, dark mode mark fill |
| **Dark Ink** | Rich Charcoal | `#111110` | `17, 17, 16` | Dark mode background, app icon tile base |
| **Accent Glow** | Warm White | `#FFFFFF` | `255, 255, 255` | High-contrast highlights, monochrome reversed |

---

## 3. Clear Space & Minimum Sizes

- **Clear Space:** Maintain a minimum clear space equal to `0.25 × Height` around the mark on all sides. No UI elements, text, or borders should intrude into this zone.
- **Minimum Digital Size:** 
  - Standard SVG: `16 × 16 px` (favicon)
  - With Tile (App Icon): `32 × 32 px`
- **Minimum Print Size:** `6 mm` height.

---

## 4. Asset Inventory (`assets/logo/`)

### Vector Masters
- `np-symbol.svg` — Master vector symbol
- `np-symbol-black.svg` — Solid 100% black silhouette
- `np-symbol-white.svg` — Solid 100% white silhouette (for dark backgrounds)
- `np-symbol-square.svg` — Centered mark on 256×256 canvas with safe padding (social avatars / profile pics)
- `np-symbol-favicon.svg` — Adaptive SVG favicon (supports automatic dark/light theme switching via CSS media query)
- `np-symbol-app-icon.svg` — Mobile / PWA application icon tile (squircle corner radius)

### Web & PWA Deliverables
- `favicon.ico` — Multi-resolution browser icon (16x16, 32x32, 48x48)
- `favicon-16.png`, `favicon-32.png`, `favicon-48.png` — Standard browser tab icons
- `apple-touch-icon.png` — iOS Home Screen icon (180x180)
- `icon-192.png`, `icon-512.png` — Android / PWA standard application icons
- `maskable-512.png` — Android adaptive maskable icon
- `site.webmanifest` — Web App Manifest configured for Nicolaus Prima
- `head-snippet.html` — Copy-paste `<head>` HTML code for any web app or landing page

---

## 5. Do's and Don'ts

- ✅ **Do** use the adaptive SVG favicon on web pages.
- ✅ **Do** use the white variant on dark surfaces (`#111110` or `#0F172A`).
- ❌ **Don't** skew, stretch, or rotate the symbol.
- ❌ **Don't** add drop shadows, outer glows, or bevel effects.
- ❌ **Don't** alter the isometric facet gaps or proportions.
