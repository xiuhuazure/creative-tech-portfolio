# Creative Tech Portfolio

Static portfolio site (HTML/CSS/JS, no build step), deployed on Cloudflare from `main`.

## Adding a new page

Start from an existing page (`about.html` is the cleanest template) so it keeps the shared
pieces: theme tokens, lantern switch, falling leaves, header, footer, buttons and motion.

### Fade-up motion (required on every page)

Every page uses the same fade-up motion: content fades in while rising slightly, one item
after another, when the page loads and as it scrolls into view. It comes from
`site-motion.css` + `site-motion.js`, so a page only needs to:

1. Keep the `js-reveal` line in `<head>` (only turns motion on when the visitor allows it):
   ```html
   <script>
     (function(){ try { if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('js-reveal'); } catch(e){} })();
   </script>
   ```
2. Load `site-motion.css` and `site-motion.js`.
3. Mark the content in the HTML:
   - `data-reveal` on an element: it fades up when it scrolls into view.
   - `data-reveal-group` on a container: each direct child fades up, one after another
     (good for text columns, grids of cards, lists).

If a page swaps content without scrolling, call
`window.siteReveal.replay(container)` afterwards to play the motion again.

### Videos (every page)

Every `<video>` autoplays muted and loops, and only plays while it's on screen. This comes from
`site-motion.js`, so just add the video tag. Keep video files in `media/`, compressed under 25 MB
(Cloudflare Pages' per-file limit). YouTube embeds use `?autoplay=1&mute=1` in their link.

### Homepage showcase

`site-showcase.css` + `site-showcase.js` run the homepage's featured-work folder (3 project tabs plus
"See all works"), the scroll-driven project folder, and the project pop-up. To add a project, add
an entry to `PROJECTS` in `site-showcase.js` and a `.pf-card` with a matching `data-project` in `index.html`.

### Cache-busting

The shared `site-*.css` / `site-*.js` links carry a version (`?v=20261107d`). When you change one of those
files, bump the version on every page so visitors' browsers fetch the new file instead of a saved old copy.

### Certifications & badges (About page)

`site-certs.css` + `site-certs.js` run the certificate holders. Each holder is one certificate; give it a Credly
badge by keeping the `.ch-badge` on its cover (or put `<img>` of the badge inside it). Fill in the pop-up details in
`CERTS` in `site-certs.js` (it reuses the project pop-up, so `site-showcase.js` must load first).

### Contact form

The homepage form sends through Web3Forms. Put the free access key from https://web3forms.com in `FORM_KEY`
in `site-cta.js`; until then the form falls back to opening the visitor's email app.
