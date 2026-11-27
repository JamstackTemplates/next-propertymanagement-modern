# Alder Key Property Management

Sample residential property management website built on the Jamstacks Next.js static export starter.
All business names, figures, addresses and contact details are fictitious.

Local development requires Node 24 or later and npm.

```sh
npm ci
npm run dev
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: headline fee, landlord/tenant door split, letterbox plan bank, 8-step leasing route, Portland neighbourhood directory, example owner statement and `RealEstateAgent` JSON-LD |
| `/fees/` | Full letterbox plan comparison, itemised USD fee ledger, interactive rent estimator, "Never on your bill" list and 8-door leasing corridor |
| `/appraisal/` | Free rental appraisal overview, three-step process, example appraisal sheet and message checklist |
| `/tenants/` | Gas/fire safety notice, three maintenance triage door hangers, email checklist, rent/lease FAQ, moving-out checklist and office hours |
| `/contact/` | Office details, Google Map, live `OpenBadge` in `America/Los_Angeles`, hosted Jamstacks enquiry form (or email fallback) and tenant repair redirect panel |
| `/404.html` | Static 404 page ("Unit 404 isn't on this floor.") |

## Make it yours (file ownership)

| File | Owns |
| --- | --- |
| `content/business.ts` | Business name, office address, emails (`hello@` and `maintenance@`), phones (office and 24/7 emergency), office hours, Equal Housing statement and Contact guidance |
| `content/plans.ts` | Management plans (`lease-up`, `full-management`, `small-building`), letterbox numbers, inclusions and `headlineFee` references |
| `content/fees.ts` | Itemised USD fee schedule, estimator maths and example owner statement. Editing Full Management's percentage here automatically updates the Home fee plate, letterbox door, fee ledger, estimator and example statement |
| `content/leasing-steps.ts` | Eight ordered leasing steps and which plans cover each step |
| `content/neighbourhoods.ts` | Portland service-area neighbourhoods, quadrants and `open` / `waitlist` intake status |
| `content/maintenance.ts` | Emergency, urgent and routine repair tiers, safety first step, response aims and maintenance email checklist |
| `app/**/page.tsx` | Page-specific headings, prose, calls to action and labels in reading order |
| `site.config.json` | Public name, description, hostname, IANA `timeZone` (`America/Los_Angeles`) and Jamstacks `siteId`/`cdnUrl` |
| `app/tailwind.input.css` | Light ("concrete by day") and dark ("lobby after hours") colour tokens, textures, letterbox/accordion styles and print rules |
| `components/hero-image.tsx`, `public/hero-light.webp`, `public/hero-dark.webp` | Home page hero rendering; the light/dark pair follows the theme toggle and only the active one downloads |
| `components/art.tsx`, `components/icons.tsx` | Inline architectural SVG artwork and 24px line icons |
| `lib/structured-data.ts` | `RealEstateAgent` JSON-LD derived from `content/business.ts`, `content/fees.ts` and `content/neighbourhoods.ts` |
| `app/sitemap.ts` | Public routes (`/`, `/fees/`, `/appraisal/`, `/tenants/`, `/contact/`) |

### Common owner edits

- **Replace the hero image**: swap `public/hero-light.webp` and `public/hero-dark.webp` for a matching pair (same composition, ~4:3, backgrounds close to `#E7E9E4` light and `#121816` dark). Edges are feathered into the page background by `.hero-art` in `app/tailwind.input.css`.
- **Change the Full Management fee (e.g. 8% → 9%)**: edit `management-fee.amounts['full-management'].value` in `content/fees.ts` (and update the static description in `site.config.json` and `public/og.png` if desired).
- **Open or pause a neighbourhood**: flip `intake` between `'open'` and `'waitlist'` in `content/neighbourhoods.ts`.
- **Update page copy**: edit JSX children directly inside `app/page.tsx`, `app/fees/page.tsx`, `app/appraisal/page.tsx`, `app/tenants/page.tsx` or `app/contact/page.tsx`.
- **Rename the business**: update `business.name` in `content/business.ts` and `name` in `site.config.json`.

## Fonts and licences

All fonts are self-hosted via Fontsource variable packages (SIL Open Font License 1.1):

- **Parkinsans** (`@fontsource-variable/parkinsans`) — headings and wordmark
- **Host Grotesk** (`@fontsource-variable/host-grotesk`) — body copy and UI
- **Ubuntu Sans Mono** (`@fontsource-variable/ubuntu-sans-mono`) — fee figures, unit numbers, kickers and directory boards

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap render
only on `/contact/` when `JAMSTACKS_SITE` (or `site.config.json`'s `jamstacks.siteId`) is set.
Without a site ID, `/contact/` shows a direct email fallback with no embed script. Both
`hello@alderkey.example` and the tenant repair redirect panel (`maintenance@alderkey.example` and
`(503) 555-0199`) remain visible in either state. Navigation to and from `/contact/` uses full
document loads via `SiteLink`.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Gallery metadata lives in `jamstacks/` (removable without affecting customer builds or tests).
Validate gallery captures separately with:

```sh
node --test jamstacks/config.test.mjs
```
