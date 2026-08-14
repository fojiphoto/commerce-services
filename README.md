# StockLedger — Website

Static marketing site for an inventory + bookkeeping + costing service business
targeting the US, UK, Canada and GCC markets.

No build step, no framework, no CDN. Plain HTML + one stylesheet.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, problem, services, case studies, pricing, team, FAQ |
| `services.html` | Full service list with pricing, one block per service line |
| `case-studies.html` | Five detailed case studies + references section |
| `about.html` | Story, the two specialists, how we work, coverage |
| `contact.html` | Lead form + direct contact details |
| `assets/styles.css` | Entire design system |

## Images

Source files live in `assets/DPs/` and `assets/Hardies WearHouse/`.
Web-optimised derivatives are generated into `assets/img/` and are what the pages use.

| File in `assets/img/` | Source | Used on |
|---|---|---|
| `mohsin.jpg` 900² | `DPs/Mohsin.png` | Home team, About bio |
| `sajjad.jpg` 900² | `DPs/Sajjad.png` | Home team, About bio |
| `mohsin-alt.jpg` 900² | `DPs/Mohsin 2.png` | **unused** — different person, see below |
| `sajjad-alt.jpg` 640² | `DPs/Sajjad.jpg` | **unused** — different person, see below |
| `wh-leather.jpg` 1000×669 | `1 (4).jpg` | Home case 1, Case study 1, Case-studies CTA |
| `wh-dc.jpg` 545×316 | `1 (2).jpg` | Home case 2, Case study 2, About CTA |
| `wh-grocery.jpg` 612×408 | `1 (5).jpg` | Home case 3, Case study 3, Services CTA |
| `wh-racking.jpg` 600×600 | `1 (3).jpg` | Case study 4, Home CTA band |
| `wh-retail.jpg` 348² | `1 (1).jpg` | **unused** — too low resolution |

Warehouse photos are captioned as illustrative, never as the team's own facility.

To regenerate after adding or replacing source images, re-run the Pillow resize step
(square top-biased crop for portraits, width-capped resize for scenes, JPEG q82–84).

## Before launch — outstanding items

Search the codebase for `TODO`, `[ ` and `needs-content` to find every placeholder.

1. **Identity of the portraits** — `DPs/` contains four photos of four different people.
   Confirm which image is actually Mohsin and which is actually Sajjad before this site
   is shown to a client or put behind ads. Currently the filenames are trusted:
   `Mohsin.png` → Mohsin, `Sajjad.png` → Sajjad.
2. **Testimonials** — 3 blocks on `index.html` and 3 on `case-studies.html` carry the
   `needs-content` class (dashed bronze border). The *metrics* shown alongside them are
   real; only the quote, name, title and company need filling. Remove `needs-content`
   once done.
3. **Phone number** — header on all five pages uses `+1 (555) 010-0199`, a reserved
   fictional number. Replace with a real US virtual number (Google Voice / OpenPhone)
   in both the `href="tel:"` and the visible text.
4. **Contact form** — `contact.html` posts to `https://formspree.io/f/YOUR_FORM_ID`.
   Create a free form at [formspree.io](https://formspree.io) or
   [web3forms.com](https://web3forms.com) and replace the ID.
5. **Contact details** — email, Calendly link, WhatsApp number and LinkedIn URL are
   placeholders in `contact.html` and in every page footer.
6. **Certification badges** — `index.html` marks QuickBooks ProAdvisor and Xero Advisor
   as `class="badge pending"` with "in progress". Remove `pending` and the "in progress"
   text only once the certification is actually earned.
7. **Sajjad's surname** — marked `[ surname to confirm ]` in `index.html` and `about.html`.
8. **Business address** — US B2B buyers look for one. Add to the footer.
9. **Domain** — decide the real domain, then update `hello@stockledger.co` throughout.

### Image upgrades worth making

- Higher-resolution warehouse photography (1600px+ wide). The current scene photos are
  545–1000px, which limits them to cards and heavily-overlaid background bands.
- An environment portrait of each person (on the warehouse floor, tablet in hand) to sit
  alongside the headshots.
- Screenshots of real anonymised deliverables to replace or supplement the CSS mockups
  in `services.html` and `case-studies.html`.

## Local preview

Open `index.html` directly in a browser, or:

```bash
python -m http.server 8000
```

## Deployment — GitHub Pages

Pushed to `main`. Enable Pages in repo settings:
**Settings → Pages → Source: Deploy from a branch → Branch: `main` → Folder: `/ (root)`**

The `.nojekyll` file is present so GitHub serves the files as-is.

### Custom domain
Add a `CNAME` file containing the domain, then point DNS:
- Apex: `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `www`: `CNAME` to `<username>.github.io`

## Content policy

All case studies describe work the team personally led. Client names are withheld
under confidentiality; industries, scale and outcomes are accurate. No invented
testimonials or borrowed client logos are used on this site.
