# Eucharia Emerie MBA - Professional Portfolio

Personal portfolio and CV site for a healthcare operations, administration and
branch-management professional based in Abuja, Nigeria.

## Stack

React 19, TypeScript, Vite 8, Tailwind CSS v4. No backend, no database and no
authentication. The contact form posts directly to Formspree; everything else is
static.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on a dedicated port, **http://localhost:5187**, with
`strictPort` enabled so it fails loudly on a collision instead of silently
moving to another port.

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server on port 5187 |
| `npm run build` | Typecheck (`tsc --noEmit`) then production build |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | TypeScript only, no emit |
| `npm run format` | Format with oxfmt |

## Environment

Copy `.env.example` to `.env` and fill in the endpoint:

```
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

Without it the contact form validates normally but shows a clear error instead
of sending. Vite reads env vars at startup, so restart the dev server after
adding it. `.env` is git-ignored; `.env.example` is committed.

## Project layout

```
public/documents/   CV in PDF and DOCX form
public/images/      Portrait and section imagery
src/config/         Contact details, document paths, CV content, images
src/components/     Page sections
src/pages/          CV route
```

Changeable values live in `src/config` rather than being scattered through
components. Contact details, document paths and CV content are each defined
once.

## Routing

Two routes: `/` for the portfolio and `/cv` for the CV. `/cv` is client-side,
so the host must serve `index.html` for unknown paths or a refresh on `/cv`
returns 404. This is configured in `netlify.toml` and `public/_redirects`.

## Deployment

Netlify, configured by `netlify.toml`:

- Build command `npm run build`, publish directory `dist`
- Node 22
- SPA fallback for client-side routes
- Long-lived caching for fingerprinted assets in `/assets/*`

## Notes

- The CV page renders its content natively rather than embedding the PDF, since
  browsers set to download PDFs rather than display them left the embed blank.
  The PDF and DOCX remain downloadable.
- CV content is transcribed from the source PDF. Education deliberately carries
  no award level, because the source document lists course names only.
- The full residential address appears in the downloadable PDF but is never
  rendered on the site.
