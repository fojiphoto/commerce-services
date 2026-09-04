# StockLedger — Website

Static marketing site for an inventory + bookkeeping + costing service business
targeting the US, UK, Canada and GCC markets.

No build step, no framework, no CDN. Plain HTML + one stylesheet.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, video, problem, services, case studies, pricing, team, FAQ |
| `services.html` | Full service list with pricing, one block per service line |
| `case-studies.html` | Five detailed case studies |
| `about.html` | Story, the two specialists, how we work, coverage |
| `contact.html` | Lead form + direct contact details |
| `thanks.html` | Post-submit landing page (`noindex`) |
| `privacy.html` | Privacy policy |
| `404.html` | Not-found page (`noindex`) |
| `robots.txt`, `sitemap.xml` | Crawl control |
| `assets/styles.css` | Entire design system |
| `assets/vera.js` | The Vera help widget (self-injecting, loaded on every page) |

## The home-page video

A click-to-play facade, not a live embed. The page renders a local poster image with a
play button; the YouTube `<iframe>` is only created when the visitor presses it.

- **Nothing is requested from YouTube — and no YouTube cookie is set — until the click.**
  Verified: zero third-party requests on load.
- The player is `youtube-nocookie.com`, with `autoplay=1` so it starts on that click and
  never on page load.
- The button is a real `<button>`, so it is keyboard- and screen-reader-accessible.
- Poster is `assets/img/video-poster.jpg` / `.webp`, derived from the video thumbnail.

To change the video, replace the ID `bLp44LIlJfs` in **two** places in `index.html` —
the player script near the bottom, and the `VideoObject` block in the JSON-LD — then
regenerate the poster from the new thumbnail.

## Vera — the guided help widget

`assets/vera.js`, loaded with `defer` on all 8 pages. It injects itself, so the site is
fully usable without it.

**It is a menu, not a live chat.** There is no backend: every reply is written in
`SCRIPT` at the top of `vera.js`, nothing is sent anywhere, and **nothing is stored** —
no cookies, no `localStorage`. That last point is not optional: `privacy.html` tells
visitors this site sets no cookies, and the widget must not make that untrue.

The panel footer says *"Vera is an automated guide, not a live agent"* on every screen.
Leave that line in. Implying a person is waiting when nobody is would be the one thing
this site's whole positioning can't afford.

To change what it says, edit `SCRIPT` — no other file is involved. Each node takes
`me` (the visitor's bubble), `say` (Vera's reply), and `opts`, where each option is
either `{label, to}` to move to another node or `{label, href}` to leave for a real page.

Accessibility is wired: `role="dialog"`, `aria-expanded` on the launcher, `aria-live`
on the message area, Esc to close, and focus returns to the launcher on close.

### The name
**Vera** — from *veritas*. The site's argument is that the books and the floor disagree
and someone has to establish which is right, so a name meaning "truth" does real work.
It is also short, pronounceable across all four target markets, and collides with no
accounting product. *Tally* was the obvious alternative and was rejected: Tally ERP is a
major accounting brand in South Asia and the Gulf, so it would read as the software.

## Icons

Source artwork lives in `Icons/` and is committed — it is only ~100KB and the
derivatives are not reproducible without it. Web-ready versions are generated into
`assets/img/icons/` as transparent PNG + WebP at 256px, and that is what the pages use.

| Slot | File in `assets/img/icons/` | Source |
|---|---|---|
| Hero chip — *Count matched* | `clipboard-check` | `clipboard_checks.png` |
| Hero chip — *True unit cost* | `calculator-costing` | `Calculator Costing.avif` |
| Service card — Inventory Control | `package` | `Package.avif` |
| Service card — QuickBooks Bookkeeping | `book-open` | `Book Open.avif` |
| Service card — Costing & Pricing | `calculator` | `Calculatgor.avif` |
| Service card — Warehouse Consultancy | `warehouse` | `Warehouse.avif` |
| Vera launcher | `message-circle` | `message-circle.jpg` |

Each is preceded in the HTML by a comment naming it, e.g. `<!-- icon: package -->`.

### Regenerating them

Every source is a flat illustration on a solid ground — white, cyan or yellow. The step
that matters is **flooding inward from the border rather than keying out a colour**, so a
white highlight *inside* the artwork survives while the ground around it goes. Then trim
to the artwork, pad 6% to a square, resize to 256px, save PNG + WebP q88.

Tolerance is 34 for every file except `Calculatgor.avif`, which needs **58**. Its yellow
ground carries a faint grid texture whose lines sit further from the median colour than
the cells do, so at 34 the fill is dammed at every line and leaves a speckled square
behind. Several automatic ways of detecting that were tried and each one misfired on a
different image, so the value is simply pinned per file.

### Two things to know

**No icon for the FIFO chip yet.** The hero originally had three chips; the middle one
(*FIFO enforced — expiry tracked*) has no artwork, so it is not rendered. Supply a
rotation/refresh icon and it can come back — the CSS position `.float-chip-2` is the
only thing that needs restoring.

**The set is stylistically mixed and off-palette.** These are saturated flat
illustrations — cyan, yellow, pink, brown — against a site built on navy, bronze and
cream, and they come from more than one icon family (two different calculator styles,
different line weights). They are used as supplied, on neutral grounds rather than the
bronze tint that suited the previous stroke icons, which is the most sympathetic setting
for them. If the mix ever looks wrong, the fix is a single-family set rather than
recolouring these.

### The floating chips

Three chips sit around the ledger card in the hero, the way Zoho Inventory scatters
badges around its hero illustration. They hang off the **top and bottom** edges, not the
sides — the card is dense (SKU rows, figures, status pills) and the left column is body
copy, so anything overlapping either one covers real content. Above and below is the
only genuinely free space.

They drift 9px on a 7s loop, disabled under `prefers-reduced-motion`. The whole visual
is `aria-hidden` — every claim on the chips is stated properly elsewhere on the page.

Below 980px the layout stacks, so the third chip is dropped (three would collide on a
320px screen) and the remaining two hang off the card's top and bottom edges. **Don't
hide them all on mobile** — that was the first attempt and it meant nobody on a phone,
or on a browser window under 1024px, ever saw them.

## Images

Source files live in `assets/DPs/` and `assets/Hardies WearHouse/`.
Web-optimised derivatives are generated into `assets/img/` and are what the pages use.

Portraits are rendered as a **navy duotone** (black point `#121e2e`, white point
`#faf7f2`). The two people were photographed in very different conditions — one studio
shot against a purple wall, one natural outdoor portrait — and a shared tonal treatment
is what makes them sit together as one team. To switch to colour, regenerate with
`duotone=False` and update nothing else.

| File in `assets/img/` | Source | Used on |
|---|---|---|
| `mohsin.jpg` 880×1100 | `DPs/Mohsin 2.png` | About bio (large portrait) |
| `mohsin-face.jpg` 640² | `DPs/Mohsin 2.png` | Home team thumbnail |
| `sajjad.jpg` 880×1100 | `DPs/Sajjad.png` | About bio (large portrait) |
| `sajjad-face.jpg` 640² | `DPs/Sajjad.png` | Home team thumbnail |

Scene photographs stay in full colour — only the portraits are toned.

| File in `assets/img/` | Used on |
|---|---|
| `wh-hero.jpg` 2000×1161 | **Home hero background**, Case study 2, About CTA |
| `wh-aisle.jpg` 1800×1201 | Case-studies page hero, Home CTA band |
| `wh-leather.jpg` 1600×1072 | Case study 1, Case-studies CTA |
| `wh-grocery.jpg` 1600×1067 | Case study 3, Services CTA |
| `wh-racking.jpg` 1400² | Case study 4 |
| `wh-retail.jpg` 1200² | Services page hero |
| `wh-*-card.jpg` 780×488 | Home case-study cards (16:10 centre crops) |
| `video-poster.jpg` 1080×608 | Home video facade |
| `og-cover.jpg` 1200×630 | Social share card for every page |

### Generated variants

Every `.jpg` above has a matching **`.webp`** (q80). Content images use
`<picture><source type="image/webp">`; full-bleed backgrounds use CSS `image-set()`,
declared twice so browsers without `image-set` keep the JPEG line.

The two heaviest backgrounds also have a **`-sm`** 1200px variant
(`wh-hero-sm`, `wh-aisle-sm`) served under 820px. The hero is the LCP element, so it is
also `<link rel="preload">`ed, one per breakpoint.

Regenerating: re-run the Pillow step (top-biased square/4:5 crops with duotone for
portraits, width-capped resize plus 16:10 card crops for scenes, JPEG q80–86), then
re-emit the `.webp`, `-sm` and `og-cover` derivatives.

Warehouse photos are captioned as illustrative, never as the team's own facility.

## The business behind the site

| | |
|---|---|
| Brand shown on the site | **StockLedger** |
| Registered entity (FBR) | **MS Business Solutions** |
| Umbrella company | **Factorial Studio (Private) Limited** |
| Office | Tariq Business Center, Johar Town, Lahore, Pakistan |
| Phone | +92 321 418 5914 |
| Email | Contact@factorialstudio.com |

The phone is stored and linked in **international format** (`tel:+923214185914`). The
local `0321…` form cannot be dialled from the US, UK, Canada or the Gulf, which is the
entire target market — don't change it back.

These appear in the footer of all 8 pages, on the contact page, in `privacy.html`, in
`vera.js`, and in the JSON-LD (`legalName`, `telephone`, `email`, `address`,
`parentOrganization`). Change one, change all of them.

**Where the names appear on the home page**

- A dedicated **The Practice** band (`.firm-band`) sits between the team section and
  Credentials, with *MS Business Solutions* as its heading and a three-column row for
  the registered name, the partnership and the office.
- Every footer carries a labelled **In partnership with — Factorial Studio (Private)
  Limited** line above the copyright.

**On the wording.** The site says *in partnership with*, not *acquired by* or *a
Factorial Studio company*. Those describe a change of ownership; what was described was
a collaboration under one umbrella. Only change this if an actual acquisition completes,
because it is a claim a client or a bank could rely on.

## Before launch — outstanding items

1. **Contact form** — `contact.html` still posts to
   `https://formspree.io/f/YOUR_FORM_ID`. **Until you replace that ID the form silently
   discards every lead.** Create a form at [formspree.io](https://formspree.io) or
   [web3forms.com](https://web3forms.com). The redirect to `thanks.html`, the subject
   line and the spam honeypot are already wired.

2. **Privacy policy** — the company details are correct now, but two things still want a
   professional eye before you promote the site to UK/EU buyers: the retention period,
   and the wording on international transfers. The site discloses plainly that data is
   handled in Lahore and that Pakistan has no UK/EU adequacy decision — that disclosure
   should stay, but have an adviser confirm the framing. Delete the note box on the page
   once that is done.

3. **Testimonials** — three on `index.html` and three on `case-studies.html` are
   **commented out**, not deleted. Ship them by pasting the real quote, name, title and
   company into each figure and removing `class="needs-content"`. They were hidden
   because publishing `[ REVIEW #1 ]` placeholders contradicts the site's own stated
   policy on invented testimonials.

4. **Sajjad's surname** — marked `[ surname to confirm ]` in `index.html` and `about.html`.

5. **Remaining contact routes** — Calendly, WhatsApp and LinkedIn render as plain text
   (`WhatsApp — coming soon`) rather than dead links. Restore them as `<a href="...">`
   once the URLs exist. The phone is a mobile, so it may well take WhatsApp — the
   contact page says "to be confirmed" rather than assuming.

6. **Certification badges** — QuickBooks ProAdvisor and Xero Advisor are marked
   `class="badge pending"` with "in progress". Remove `pending` and that text only once
   the certification is actually earned.

7. **Domain** — the site is live at `https://factorialstudio.com/commerce-services/`,
   and every `canonical`, Open Graph tag, `sitemap.xml`, `robots.txt` entry and the
   form's `_next` point there. If a dedicated domain is bought later, replace the base
   URL in all of those.

### Nice to have

- Photography of the team's own facilities, to replace the illustrative stock scenes.
- An environment portrait of each person (on the warehouse floor, tablet in hand).
- Screenshots of real anonymised deliverables to replace the CSS mockups.
- Analytics. There is none, deliberately — which is also why no cookie banner is needed.
  Adding any will change what `privacy.html` has to say.

## Notes for whoever edits the CSS next

Two cascade traps are already fixed; both are easy to reintroduce.

- **`.hero::before` also matches `.hero-dark`.** It sets `opacity: .35` and a fade-out
  `mask-image` for the light hero's rule-line texture. `.hero-dark::before` must reset
  both, or the navy wash over the hero photograph renders at roughly 17% and vanishes
  entirely below 70% of the hero — white type on a bare, bright warehouse photo.
- **Never use the `background` shorthand on `.hero-dark` or `.photo-band`.** The photo
  now comes from a `.bg-wh-*` class, and the shorthand resets `background-image` to
  `none`. Use `background-color` and the other longhands.

The hero overlay is held at ≥.88 alpha across the left 52% (where all the type sits) and
falls to .50 on the right so the photograph is visible. That floor was chosen against the
*brightest pixel* under the text column, not the average, so white text clears 4.5:1 even
on a blown-out highlight. Below 980px the layout stacks and the wash becomes even.

Every text/background pair on all 8 pages passes WCAG AA. If you lighten `--ink-3`,
`--bronze` or the button colours, re-check them.

## Local preview

Open `index.html` directly in a browser, or:

```bash
python -m http.server 8000
```

## Deployment — GitHub Pages

Pushed to `main`. Enable Pages in repo settings:
**Settings → Pages → Source: Deploy from a branch → Branch: `main` → Folder: `/ (root)`**

The `.nojekyll` file is present so GitHub serves the files as-is. GitHub Pages serves
`404.html` automatically for unknown paths.

### Custom domain
Add a `CNAME` file containing the domain, then point DNS:
- Apex: `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `www`: `CNAME` to `<username>.github.io`

## Content policy

All case studies describe work the team personally led. Client names are withheld
under confidentiality; industries, scale and outcomes are accurate. No invented
testimonials or borrowed client logos are used on this site.

Metrics are tied to the engagement they came from. The home page previously carried a
Case 04 figure (900 orders/day, a grocery platform) on the Case 03 card (a QSR
operator), and presented a single relocation's `<0.5%` damage rate as a standing "stock
loss rate"; both now match their sources. Keep it that way — the whole pitch rests on the
numbers being checkable.
