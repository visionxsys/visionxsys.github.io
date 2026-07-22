# VisionXSystems — Website

A fully static, front-end-only rebuild of visionxsys.github.io, restructured into four pages with the same dark/gold/lime visual identity from your logo.

## Structure

```
├── index.html          Home — hero, stats, work teasers, workflow, FAQ, CTA
├── services.html        Services — about the studio + pricing (all 6 services)
├── portfolio.html       Portfolio — filterable grid (placeholder cards for now)
├── contact.html          Contact — form + social links
├── css/
│   ├── style.css         Layout, components, typography
│   └── animations.css    Keyframes & motion-only utility classes
├── js/
│   ├── main.js            Shared: nav, scroll reveal, hero animation, loader
│   ├── faq.js              Home page FAQ accordion
│   ├── portfolio.js       Portfolio filter tabs
│   └── contact.js          Contact form validation + success state
├── images/                Logo + favicon assets
└── resources/social-cards/  Branded @visionxsys profile cards (Instagram, X,
                              LinkedIn, Discord, Reddit, GitHub) — 1080×1080,
                              ready to upload as profile pictures.
```

## Notes

- **Fully static** — no build step, no framework. Open `index.html` directly or
  host on GitHub Pages / any static host.
- **Fonts** load from Google Fonts (Archivo Black, Inter, Space Mono) via CDN —
  requires an internet connection to render correctly.
- **Contact form** is front-end only right now (see the note under the form).
  Wire it up to Formspree, EmailJS, or your own backend when you're ready to
  receive real submissions.
- **Portfolio placeholders** are gradient/icon cards labeled "Placeholder —
  link coming soon." Swap the `.swatch` background or drop in `<img>` tags
  once you send over real project links or screenshots.
- **Favicon** was cropped and re-composed from your logo's "X" mark on a dark
  rounded background so it stays legible at 16–32px.
- Colors and type are pulled straight from the logo: near-black background,
  white display type, gold (`#c9a24b`) for eyebrows/accents, and lime
  (`#e8ff3d`) as the signature "X" highlight color used throughout hovers,
  dividers, and the animated hero line field.
