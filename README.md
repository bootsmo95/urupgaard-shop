# urupgaard-shopify

Nuxt 4 storefront til Urupgaard, koblet til Shopify via Storefront API (GraphQL).

Repoet er bygget til at kunne køre lokalt samt deployes på Coolify via Docker.

---

## Stack

- **Nuxt 4** + **Vue 3**
- **Nitro server** (SSR + server/api routes)
- **Shopify Storefront API** (GraphQL)
- **TailwindCSS**
- **Docker** (Coolify deploy)
- **Directus (optional)** til indhold/CMS (se `directus/`)

---

## Hurtig start (lokalt)

```bash
npm install
cp .env.example .env
npm run dev
```

Krav i `.env`:
- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `NUXT_PUBLIC_SITE_URL` (lokalt: `http://localhost:3000`)

---

## Deploy (Coolify, Docker)

Repoet har `Dockerfile` til produktion.

- Build: **Dockerfile**
- Port: **3000**
- Start: `node .output/server/index.mjs` (står i Dockerfile)

Vigtige runtime env vars i Coolify:
```env
SHOPIFY_STORE_DOMAIN=urupgaard-butik.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=...
NUXT_PUBLIC_SITE_URL=https://shop.ditdomæne.dk
CONTACT_NOTIFICATION_WEBHOOK_URL=... # optional
```

---

## Repo struktur (overblik)

### `pages/` (sidetyper)
- `pages/index.vue` – Forside
- `pages/shop/index.vue` – **Shop (collections oversigt)**
- `pages/shop/[collection]/index.vue` – Collection landing (produkter i en kollektion)
- `pages/shop/[collection]/[handle].vue` – Product detail page (PDP)
- `pages/cart.vue` – Kurv
- `pages/drops.vue` – Drops
- `pages/contact.vue` – Kontakt
- `pages/checkout-placeholder.vue` – Fallback checkout (når Shopify checkout ikke er tilgængelig)

### `server/api/` (backend routes)
Nuxt/Nitro server routes. Vigtigt: **ingen `.get.ts`/`.post.ts` suffix**. Hver resource ligger i en enkelt `.ts` fil.

- `server/api/products/[handle].get.ts` – Hent produkt (PDP data)
- `server/api/products/search.ts` – Produkt søgning (GET)
- `server/api/products/related.ts` – Relaterede produkter (GET)
- `server/api/collections/[handle].get.ts` – Collection + produkter
- `server/api/contact.ts` – Kontaktformular (POST)
- `server/api/newsletter.ts` – Nyhedsbrev signup (POST)
- `server/api/cart.ts` – Kurv (GET/POST/PATCH/DELETE)
- `server/api/reviews.ts` – Reviews (GET/POST)

### `server/utils/` (Shopify helpers)
- `server/utils/shopify.ts` – `useShopifyClient()` (Storefront API client)
- `server/utils/shopify-cart.ts` – Shopify cart helpers
- `server/utils/cart.ts` – Session cart fallback
- `server/utils/contact.ts` – Kontakt submissions til JSON
- `server/utils/reviews.ts` – Reviews persistence + helpers

### `components/` (UI)
- `components/ProductGallery.vue` – Billedegalleri på PDP
- `components/RelatedProducts.vue` – Relaterede produkter
- `components/ProductReviews.vue` – Reviews UI
- `components/ProductSearch.vue` – Search UI (bruges i header modal)
- `components/SiteSearchModal.vue` – Fullscreen search modal
- `components/SiteHeaderCart.vue` – Cart ikon/summary
- `components/NewsletterSignup.vue` – Nyhedsbrev form
- `components/ContactForm.vue` – Kontakt form

### `assets/`
- `assets/css/main.css` – Design tokens + base styles + font stacks

### `data/` og `server/data/` (lokal persistence)
Bruges kun som enkel storage i v1:
- `data/contact-submissions.json`
- `server/data/newsletter-signups.json`
- `server/data/reviews.json`

I produktion anbefales DB/CMS til alt content (fx Directus).

---

## Dataflow (Shopify)

1) UI pages/components kalder `useFetch`/`$fetch` mod `server/api/*`
2) API routes bruger `useShopifyClient()` (Storefront API)
3) Hvis Shopify client mangler (env ikke sat) eller request fejler, kan nogle endpoints falde tilbage til placeholder data.

**OBS:** `/api/cart` kan returnere en lokal fallback cart (`id: local-...`) hvis Shopify checkout/cart ikke er tilgængelig.

---

## CMS (Directus)

Der ligger en klar Directus setup under `directus/`:
- `directus/docker-compose.directus.yml`
- `directus/.env.directus.example`
- `directus/README.md`

Kør Directus som **separat service** i Coolify (egen URL, fx `cms.urupgaard.dk`) med Postgres + persistent uploads volume.

---

## Kendte ting / TODO (godt for næste agent)

- Ensret API filnavne: nogle routes bruger stadig `*.get.ts` pga. legacy (fx `products/[handle].get.ts`, `collections/[handle].get.ts`). Hvis I vil være 100% konsekvente, kan de flyttes til `products.ts` / `collections.ts` med query params.
- Overvej at fjerne alle fallback sample-data når Shopify er stabilt i prod.
- Flyt content (forside/drops/SEO tekster) til Directus.

---

## Kontakt

Hvis en ny AI agent skal overtage:
- Start med at læse `nuxt.config.ts`, `server/utils/shopify.ts` og `server/api/*` for at forstå Shopify integrationen.
- Læs `directus/README.md` for CMS setup.
