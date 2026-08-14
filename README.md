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

Portraits are rendered as a **navy duotone** (black point `#121e2e`, white point
`#faf7f2`). The two people were photographed in very different conditions — one studio
shot against a purple wall, one natural outdoor portrait — and a shared tonal treatment
is what makes them sit together as one team. It also keeps them inside the site palette.
To switch to colour, regenerate with `duotone=False` and update nothing else.

| File in `assets/img/` | Source | Used on |
|---|---|---|
| `mohsin.jpg` 880×1100 | `DPs/Mohsin 2.png` | About bio (large portrait) |
| `mohsin-face.jpg` 640² | `DPs/Mohsin 2.png` | Home team thumbnail |
| `sajjad.jpg` 880×1100 | `DPs/Sajjad.png` | About bio (large portrait) |
| `sajjad-face.jpg` 640² | `DPs/Sajjad.png` | Home team thumbnail |
| `mohsin-alt.jpg` 640² | `DPs/Mohsin.png` | spare — second photo of Mohsin |
| `sajjad-alt.jpg` 640² | `DPs/Sajjad.jpg` | spare — second photo of Sajjad |

Scene photographs stay in full colour — only the portraits are toned.

| File in `assets/img/` | Source | Used on |
|---|---|---|
| `wh-hero.jpg` 2000×1161 | `1+(2).jpg` | **Home hero background**, Case study 2, About CTA |
| `wh-aisle.jpg` 1800×1201 | `6.jpg` | Case-studies page hero, Home CTA band |
| `wh-leather.jpg` 1600×1072 | `1+(4).jpg` | Case study 1, Case-studies CTA |
| `wh-grocery.jpg` 1600×1067 | `1+(5) (1).jpg` | Case study 3, Services CTA |
| `wh-racking.jpg` 1400² | `1+(3).jpg` | Case study 4 |
| `wh-retail.jpg` 1200² | `1+(1).jpg` | Services page hero |
| `wh-*-card.jpg` 780×488 | 16:10 centre crops | Home case-study cards |

Scene images exist at two sizes on purpose: full-size for page heroes and detail
figures, and a 780px 16:10 `-card` crop for the three home-page case cards, so the
home page does not pull three 1600px files it only renders at card width.

Warehouse photos are captioned as illustrative, never as the team's own facility.

To regenerate after adding or replacing source images, re-run the Pillow step
(top-biased square/4:5 crops with duotone for portraits, width-capped resize plus
16:10 card crops for scenes, JPEG q80–86).

## Before launch — outstanding items

Search the codebase for `TODO`, `[ ` and `needs-content` to find every placeholder.

1. **Testimonials** — 3 blocks on `index.html` and 3 on `case-studies.html` carry the
   `needs-content` class (dashed bronze border). The *metrics* shown alongside them are
   real; only the quote, name, title and company need filling. Remove `needs-content`
   once done.
2. **Phone number** — header on all five pages uses `+1 (555) 010-0199`, a reserved
   fictional number. Replace with a real US virtual number (Google Voice / OpenPhone)
   in both the `href="tel:"` and the visible text.
3. **Contact form** — `contact.html` posts to `https://formspree.io/f/YOUR_FORM_ID`.
   Create a free form at [formspree.io](https://formspree.io) or
   [web3forms.com](https://web3forms.com) and replace the ID.
4. **Contact details** — email, Calendly link, WhatsApp number and LinkedIn URL are
   placeholders in `contact.html` and in every page footer.
5. **Certification badges** — `index.html` marks QuickBooks ProAdvisor and Xero Advisor
   as `class="badge pending"` with "in progress". Remove `pending` and the "in progress"
   text only once the certification is actually earned.
6. **Sajjad's surname** — marked `[ surname to confirm ]` in `index.html` and `about.html`.
7. **Business address** — US B2B buyers look for one. Add to the footer.
8. **Domain** — decide the real domain, then update `hello@stockledger.co` throughout.

### Image upgrades worth making

- Photography of the team's own facilities, to replace the illustrative stock scenes.
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
