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
Build command:
```bash
npm run build
```

Publish directory:
```bash
.output/public
```

## Næste anbefalede step
- Hook rigtige collections og produktdetaljer op mod Shopify
- Tilføj remove/update quantity i kurven
- Flyt drops til CMS eller Shopify metafields
- Tilføj e-mail capture før drops
