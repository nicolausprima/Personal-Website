# AGENTS.md — Nicolaus Prima Portfolio

## Stack
- **Paper Design System** applied: minimal, clean visual style.
- Pure static site: vanilla HTML/CSS/JS. No build tools, no package manager, no framework.
- Typed.js loaded via CDN (`unpkg`) and Google Fonts via `<link>`.

## Design Tokens (Paper Design)
| Token | Value |
|---|---|
| `--primary` | #111111 |
| `--secondary` | #8B5CF6 |
| `--surface` | #FFFFFF |
| `--text` | #111827 |
| `--muted` | #6B7280 |
| `--border` | #E5E7EB |
| Font body | Roboto |
| Font display | Montserrat |
| Font mono | PT Mono |
| Spacing scale | 4/8/12/16/24/32 |

## Active entrypoint
- **`index.html`** is the only page. Open directly in a browser to preview.
- All styling is **inline `<style>` inside `index.html`** (not `style.css`).

## What lives where
| Path | Role |
|---|---|
| `index.html` | Single-page portfolio (Hero, Projects, Education, Skills, Footer). Contains all CSS per Paper Design. |
| `app.js` | Typed.js text animation + IntersectionObserver scroll reveal. |
| `style.css` | **Legacy** stylesheet (Poppins, older layout). Not loaded by `index.html`. |
| `BelajarTailwind/` | Experiment (just `@import "tailwindcss"`). Not wired into the site. |
| `FileSVG/`, `FilePNG/`, `*.jpg`, `*.png` | Static assets. |

## How to work
1. Edit `index.html` for markup and styling. No build step.
2. Edit `app.js` for JS behavior.
3. Refresh the browser to see changes.

## Conventions (Paper Design)
- Use semantic CSS custom properties (tokens) over raw values.
- Typography: headings → Montserrat, body → Roboto, code/meta → PT Mono.
- Spacing: stick to the 4/8/12/16/24/32 scale (--space-1 through --space-6).
- States: must define default, hover, focus-visible, active for interactive elements.
- All interactive elements need visible `:focus-visible` outline (`2px solid var(--secondary)`).
- Cards use `box-shadow` + `border` for paper-like depth.

## Gotchas
- `style.css` is **not included** by `index.html`. The real styles are in the `<style>` tag of `index.html`.
- Logo images (`LogoSmanig.png`, `LogoPENS.png`) have `onerror` fallbacks if paths mismatch.
- No tests, no CI, no linting config.
