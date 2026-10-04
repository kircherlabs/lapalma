# La Palma — GitHub Pages Website

A static, responsive multi-page website built from the supplied La Palma brand board, restaurant imagery, menu PDF and MenuText source.

## Pages
- `index.html` — home / hero
- `menu.html` — web menu + provided PDF
- `experience.html` — day-to-night restaurant / dance / waterfront concept
- `events.html` — social calendar
- `gallery.html` — image gallery with lightbox
- `reservations.html` — reservation / private event inquiry shell
- `404.html` — GitHub Pages-friendly not-found page

## Before launch: confirm operational details
Open `js/site-config.js` and add **only confirmed** values for:
- street address
- phone / email
- reservation email or external booking URL
- social links
- public event dates

The site intentionally does **not** invent these details. Until a real reservation destination is configured, the reservation form is visibly disabled rather than pretending to submit.

## Menu source note
The live HTML menu is generated from the supplied `MenuText.txt`. The supplied `LaPalmaMENU.pdf` is included as a downloadable designed menu. The two supplied sources contain some different pricing/content, so the build does not silently merge or reconcile them.

## Deploy to GitHub Pages
1. Create a GitHub repository.
2. Upload the contents of this folder to the repository root.
3. In GitHub: **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.
6. GitHub will publish the site at the Pages URL shown there.

No build step or framework is required. The `.nojekyll` file is included.
