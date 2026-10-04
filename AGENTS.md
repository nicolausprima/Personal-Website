# Website

Static portfolio site (Nicolaus Prima). No build step, no package manager.

## Files
- `index.html` — markup + SEO/OG meta + JSON-LD (single large file, ~2500 lines)
- `app.js` — theme toggle, anchor scrolling, nav, reveal animations (~1100 lines)
- `assets/`, `FileSVG/` — images/icons; `favicon.svg`, `og-image.png` social assets

## Rules
- Static only: plain HTML/CSS/JS. Don't add npm/Cargo/pip deps unless asked.
- Preview with `python -m http.server` from repo root, or deploy via Vercel.
- Keep SEO/OG/canonical URLs as `https://nicolausprima.vercel.app/`.
- Match existing style; small targeted edits over rewrites.
- Don't commit `CV*.pdf`, `FotoMuka.jpg` duplicates, or `desktop.ini` changes.
