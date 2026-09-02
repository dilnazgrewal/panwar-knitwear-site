# Panwar Knitwear — homepage

Redesigned single-page site for Panwar Knitwear, a knitwear manufacturer in
Ludhiana, Punjab, and its two house brands ZONIXA (top wear) and MSP Sports
(bottom wear).

Static HTML, CSS and vanilla JS. No framework, no build step.

```
index.html            markup and JSON-LD
assets/css/style.css  design system and all layout
assets/js/main.js     sticky header, mobile nav, scroll reveal, enquiry form
```

## Running locally

```bash
python -m http.server 5510
```

Then open <http://localhost:5510>.

## Design notes

Ink / bone / brass palette. Fraunces for display, Inter for body, IBM Plex
Mono for spec labels. Two custom components carry the identity:

- **Spec Tag** — each style renders as a hang tag with its real GSM, sizes
  and article number.
- **Fabric library** — all eight fabrics are drawn as CSS weaves, no images.

Contact runs through WhatsApp: the enquiry form composes a formatted message
client-side and opens `wa.me`. There is no backend.

## Content rules

Every figure on the page is taken from the company's existing site or is
countable from its catalogue. Nothing is invented — no MOQ, lead time,
founding year, capacity or client numbers appear anywhere, because none of
those are published sources.

## Open items

- The footer has no email address. The previous site showed the placeholder
  `email@example.com`, which was deliberately not carried over. See the
  `TODO` comment in `index.html`.
- Product images are hotlinked from `panwarknitwear.com` and are still the
  original 982x1147 JPEGs (~250KB each) shown at roughly 400px. Resizing
  them server-side is the biggest remaining performance win.
- MSP Sports has no real product photography. It is presented as a category
  panel rather than a product grid until a shoot exists.

## Deployment

Pushes to `main` deploy automatically via Vercel.

To deploy by hand, note that the Vercel CLI cannot write its default config
on this machine (the `AppData\Roaming\xdg.data` path redirects into an
app-container location and rename fails with `EXDEV`), so pass a config
directory explicitly:

```bash
vercel deploy --prod --global-config "D:\Desktop\Claude\Claude_class\.vercel-cli-config"
```
