# OnlyUsedTesla UK — dealer page + UK cash-offer flow

This update keeps the existing UK dealer landing page and adds a new consumer-facing **Get a cash offer** page.

## What is included

- `index.html` — updated UK landing page with a new cash-offer CTA
- `cash-offer.html` — new UK Tesla owner flow
- `styles.css` — shared grayscale styling for both pages
- `script.js` — shared JavaScript for the dealer form, sticky CTA, and cash-offer step flow

## New cash-offer flow

The flow is intentionally simple:

1. Visitor enters **UK registration** and **current mileage**
2. Page shows **“We’ve found your car”** confirmation
3. Visitor leaves **name, mobile, email, postcode**
4. Lead is sent to your **form endpoint / CRM / routing workflow**
5. You forward or route the enquiry to selected **UK Tesla dealer partners**

That is the same fundamental pattern as the dealer-auction style flow you referenced: start with the car, confirm it, then capture dealer-ready contact data.

## Important connection points

### Dealer form on `index.html`

Find:

```html
<form id="dealerForm" class="form" method="post" action="">
```

Add your endpoint to `action`, for example:

```html
<form id="dealerForm" class="form" method="post" action="https://YOUR_ENDPOINT">
```

### Cash-offer form on `cash-offer.html`

Find:

```html
<form id="cashOfferForm" class="form" method="post" action="">
```

Add your endpoint to `action`, for example:

```html
<form id="cashOfferForm" class="form" method="post" action="https://YOUR_ENDPOINT">
```

Or replace the entire form with your embed code from Formspree, Getform, HubSpot, Typeform, or your own backend.

## Hidden fields already included in the cash-offer form

These fields are automatically filled by `script.js` after the visitor confirms the vehicle:

- `vehicle_registration`
- `vehicle_mileage`
- `vehicle_summary`
- `lead_source`

That means your endpoint receives both the contact details and the Tesla details without extra work.

## Demo vehicle lookup

The page includes a front-end preview lookup so the flow works immediately in a static repo.

Demo registrations included:

- `LA17 XPM` → Tesla Model X example
- `LB21 TES` → Tesla Model 3 example
- `YA22 TES` → Tesla Model Y example

You can later swap this front-end demo logic for:

- a DVLA / MOT / valuation API lookup
- your own vehicle database
- a serverless function
- a CRM enrichment step

## Suggested routing setup

A lightweight launch setup could be:

1. `cashOfferForm` posts to Formspree / Getform / webhook
2. webhook sends lead to email, Slack, Airtable, HubSpot, or your backend
3. you forward to selected UK dealers based on postcode, model, age, or stock needs

## Notes

- The styling is intentionally **simple grayscale** to match your current UK page direction.
- The main CTA on the UK page now points to `cash-offer.html`.
- In demo mode, if the cash-offer form has no `action`, the page shows a success state instead of sending data.
- Add your own privacy policy / consent language if you want to tighten compliance wording before launch.

## Quick deploy

1. Upload all files to the repo root
2. Commit to `main`
3. GitHub Pages will serve:
   - `/index.html`
   - `/cash-offer.html`
