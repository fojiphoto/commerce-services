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

## Before launch — outstanding items

Search the codebase for `TODO`, `[ ` and `needs-content` to find every placeholder.

1. **Testimonials** — 3 blocks on `index.html` and 3 on `case-studies.html` are marked
   with the `needs-content` class (dashed bronze border). Replace with real names,
   titles, companies and quotes. Delete the `needs-content` class once filled.
2. **Contact form** — `contact.html` posts to `https://formspree.io/f/YOUR_FORM_ID`.
   Create a free form at [formspree.io](https://formspree.io) or
   [web3forms.com](https://web3forms.com) and replace the ID.
3. **Contact details** — email, Calendly link, WhatsApp number and LinkedIn URL are
   placeholders in `contact.html` and in every page footer.
4. **Sajjad's surname** — marked `[ surname to confirm ]` in `index.html` and `about.html`.
5. **Domain** — decide the real domain, then update `hello@stockledger.co` throughout.

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
