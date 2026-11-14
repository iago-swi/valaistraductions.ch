# valaistraductions.ch

Site for [Valais Traductions](https://www.valaistraductions.ch) — Philippe Noth, freelance translator (German and English into French) in Guttet, Valais, Switzerland.

Static, trilingual (FR / EN / DE), no framework, no build step. Pure HTML and CSS, a few lines of vanilla JavaScript, and one small PHP script for the contact form. It replaces the former WordPress site.

## Structure

```
/
├── index.html      # Fallback redirect (browser language → fr/, de/ or en/)
├── .htaccess       # Apache: language redirect, old WordPress addresses, 404
├── 404.html
├── contact.php     # Contact form handler (sends an e-mail)
├── assets/         # Favicons (kept from the old site)
├── css/style.css   # Single stylesheet, design tokens at the top
├── js/script.js    # Sends the form in the background
├── images/         # Logo (black and white versions), portrait, book covers, bêtisier screenshots
└── fr/  en/  de/   # One folder per language, mirrored content
    ├── index.html      # One-page site
    └── betisier.html   # Bêtisier / Bloopers / Stilblüten
```

Text changes must be made in all three language folders.

## Design

Everything derives from the logo: black line work, a white ground and the red of the three stars (`#E30613`). The hero ridge is an SVG polyline that extends the mountain of the logo's "A"; it draws itself once on load (skipped with `prefers-reduced-motion`). Type: Jost (display, navigation) and Newsreader (running text), from Google Fonts.

## Running locally

```powershell
php -S localhost:8124
```

Then open <http://localhost:8124>. The contact form needs a mail server, so locally it shows its error message.

## Deploying

Copy the contents of this folder to the web root of an Apache host with PHP. Before going live, check the two addresses at the top of `contact.php` (`MAIL_TO`, `MAIL_FROM`).

`.htaccess` redirects the old WordPress addresses (`/about/`, `/fr/a-propos/`, the blog posts, …) to their new place, so existing links and search results keep working.
