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

If a page swaps content without scrolling (like the Work page tabs), call
`window.siteReveal.replay(container)` afterwards to play the motion again.
