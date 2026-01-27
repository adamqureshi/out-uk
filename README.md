# OnlyUsedTesla UK — Dealer Landing Page

This is a lightweight, grayscale “fat finger” landing page you can deploy quickly (e.g., GitHub Pages).

## Files
- `index.html` — single-page landing page
- `styles.css` — styling (no external dependencies)
- `script.js` — small helper for the form

## Connect your form
Open `index.html` and locate the `<form id="dealerForm" ...>` block in the **Dealer sign up** section.

You have two easy options:

### Option A) Point it at your form endpoint
Set the `action` attribute to your endpoint:

```html
<form id="dealerForm" method="post" action="https://YOUR_ENDPOINT">
```

(Examples: Formspree, Getform, your backend route, etc.)

### Option B) Paste your existing embed
Replace the entire `<form>...</form>` block with your embed code (HubSpot, Typeform, etc.).

## Deploy (GitHub Pages)
1. Create a repo named `out-2026-uk`
2. Upload these files to the repo root
3. In GitHub: **Settings → Pages → Build and deployment**
   - Source: Deploy from a branch
   - Branch: `main` / root

## Notes
- Replace the placeholder email `uk@onlyusedtesla.co.uk` if you want a different address.
- Update pricing text, terms, and any compliance language as needed.
