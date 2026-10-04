# La Palma — GitHub Pages Website

This package is a complete static site for **La Palma Cuban · Latin Kitchen**. It is intentionally flat (all website files are in one folder) so it can be uploaded directly to a GitHub Pages repository without a build step.

## Publish on GitHub Pages

1. Open the GitHub repository that should host the site.
2. Remove the previous site files if replacing an older version.
3. Upload **every file in this folder** to the repository root. `index.html` must sit at the top level.
4. Commit the changes.
5. Open **Settings → Pages**.
6. Choose **Deploy from a branch**, branch **main**, folder **/(root)**.
7. Save and wait for GitHub Pages to publish.

## Site pages

- `index.html` — full home experience
- `menu.html` — the original seven-page menu rendered directly as responsive page images, with a PDF download option
- `experience.html` — waterfront setting, day-to-night flow and dance program
- `events.html` — daily social calendar from October 4 through December 31, 2026
- `private-events.html` — group dining and private event experience
- `gallery.html` — image gallery with lightbox
- `reservations.html` — reservation request form
- `404.html` — custom not-found page

## Event calendar

The calendar is generated in `main.js` from a weekly recurring schedule plus holiday overrides. It contains an event for every date from **October 4, 2026 through December 31, 2026**.

Recurring rhythm:

- Monday — Cafecito & Dominoes
- Tuesday — Rum Room Tuesday
- Wednesday — Salsa Social
- Thursday — Havana Live
- Friday — La Noche Cubana
- Saturday — Sunset to Salsa
- Sunday — Brunch & Boleros

Special seasonal events include Halloween, Día de los Muertos, Veterans Day, Thanksgiving Eve, Thanksgiving, holiday social nights, Nochebuena, Christmas Day and New Year's Eve.

## Venue imagery

The site uses the closed-roof aerial overview for the venue. The guest-facing copy focuses on the dining room, bar, dance floor and waterfront terraces rather than explaining architectural render conventions.

## Contact details

The current placeholder contact details live in `site-config.js` and can be changed in one place. If real reservation or private-event contact information is available, replace the placeholder phone/email values there and the visible pages can be updated to match.

## Brand

The site uses the provided La Palma palette and marks:

- Palma Green `#0E3B2E`
- Havana Cream `#F8F1E3`
- Brass `#C9A96A`
- Terracotta `#C26846`
- Habana Black `#1F1F1F`

The supplied primary logo, monogram and circular secondary badge are included as image assets. The secondary badge is cropped to the actual circular mark with the presentation-sheet label removed.
