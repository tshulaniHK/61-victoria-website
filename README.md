# 61 Victoria — Pathways Beyond Matric

The 2026 social impact ePortfolio of 61 Victoria (Listen, Live & Learn, Stellenbosch University),
live at **https://tshulanihk.github.io/61-victoria-website/**.

GitHub Pages serves the site straight from the `docs/` folder. There is no build step.

| File | What it is |
|---|---|
| `docs/index.html` | All page content (Home, Project, Dinner Guests, Reflections, Partners) |
| `docs/styles.css` | Colours and layout. The palette matches the 2026 SDG poster |
| `docs/script.js` | Page switching, mobile menu, photo viewer |
| `docs/images/` | Compressed web copies of photos (originals stay on the local machine) |

## Common edits

- **Add a dinner:** in `index.html`, copy an `<article class="dinner">` block, bump its id
  (`dinner-7`) and add a matching link in `.dinner-index`.
- **Add a reflection:** copy an `<article class="card reflection">` block on the Reflections page.
- **Add photos:** resize to about 1600px on the long side, then save them into `docs/images/…`.
  Wrap each one in `<button class="zoom" type="button"><img …></button>` inside a `.gallery`.

Preview locally with `python3 -m http.server -d docs 8000`, then open http://localhost:8000.
