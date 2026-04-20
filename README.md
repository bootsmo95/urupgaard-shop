# urupgaard-shopify

Nuxt 4 starter til en simpel Shopify-baseret gårdbutik med fokus på keramik, små serier og drops.

## Stack
- Shopify Basic
- Shopify Storefront API
- Nuxt 4
- Netlify hosting
- Shopify checkout

## Indeholder i v1
- Forside
- Collection route
- Product detail route
- Kurv
- Checkout redirect til Shopify
- Drops-side med countdown
- Shopify API wrapper med fallback data
- Klar til custom frontend videreudvikling

## Setup
1. Installer dependencies
   ```bash
   npm install
   ```
2. Kopiér env fil
   ```bash
   cp .env.example .env
   ```
3. Udfyld:
   - `SHOPIFY_STORE_DOMAIN`
   - `SHOPIFY_STOREFRONT_TOKEN`
4. Start projektet
   ```bash
   npm run dev
   ```

## Netlify
Repoet er gjort klar til import i Netlify.

### Import settings
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `22`
- Netlify kører Nuxt via `@netlify/nuxt` + Nitro preset `netlify`

### Environment variables
```env
SHOPIFY_STORE_DOMAIN=urupgaard-butik.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your-public-storefront-token
NUXT_PUBLIC_SITE_URL=https://your-netlify-site.netlify.app
```

### Import flow
1. Opret nyt site i Netlify fra GitHub repo
2. Netlify læser `netlify.toml`
3. Tilføj environment variables
4. Deploy
5. Hvis Netlify har cached gammel config, så tryk redeploy efter seneste push

Netlify skal her køre som SSR/Nitro runtime, så `nuxt build` er korrekt fordi projektet bruger API routes og cart logic.

Projektet bruger nu `@netlify/nuxt`, som er Netlifys anbefalede integration til Nuxt og giver produktionsparitet for server routes og platform primitives.

### Efter første deploy
Sæt `NUXT_PUBLIC_SITE_URL` til det rigtige Netlify domæne eller custom domæne og redeploy.

## Næste anbefalede step
- Hook rigtige collections og produktdetaljer op mod Shopify
- Tilføj remove/update quantity i kurven
- Flyt drops til CMS eller Shopify metafields
- Tilføj e-mail capture før drops
