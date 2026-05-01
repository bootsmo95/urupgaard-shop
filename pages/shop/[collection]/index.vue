<script setup lang="ts">
const route = useRoute()
const handle = computed(() => String(route.params.collection || 'collection'))

const { data, pending, error } = await useFetch(() => `/api/collections/${handle.value}`)

const collection = computed(() => data.value?.collection)
const products = computed(() => data.value?.products ?? [])
</script>

<template>
  <div style="background: var(--urup-pageBg, #f6f3ee); color: var(--urup-text, #1c1a17); min-height: 100vh">
    <div v-if="pending" style="max-width: 1440px; margin: 0 auto; padding: 60px 54px 80px">
      Loader...
    </div>

    <div v-else-if="error" style="max-width: 1440px; margin: 0 auto; padding: 60px 54px 80px">
      Fejl: {{ error }}
    </div>

    <div v-else-if="!collection" style="max-width: 1440px; margin: 0 auto; padding: 60px 54px 80px">
      Ingen data
    </div>

    <template v-else>
      <section style="background: var(--urup-pageBg, #f6f3ee); padding: 60px 54px 80px; border-bottom: 1px solid rgba(28,26,23,0.12)">
        <div style="max-width: 1440px; margin: 0 auto">
          <div style="display: flex; gap: 8px; font-family: var(--urup-body, Inter, system-ui); font-size: 13px; color: var(--urup-textMuted, #857c70); margin-bottom: 32px">
            <NuxtLink to="/" style="color: inherit; text-decoration: none">Forside</NuxtLink>
            <span style="opacity: 0.5">/</span>
            <NuxtLink to="/shop" style="color: inherit; text-decoration: none">Butik</NuxtLink>
            <span style="opacity: 0.5">/</span>
            <span style="color: var(--urup-text, #1c1a17)">{{ collection.title }}</span>
          </div>

          <div class="urup-page-head urup-split-2" style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 80px; align-items: end">
            <div>
              <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 24px">
                Kollektion · {{ products.length }} stykker
              </div>
              <h1 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-style: italic; font-size: clamp(44px, 6vw, 96px); line-height: 0.95; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0">
                {{ collection.title }}
              </h1>
            </div>
            <p v-if="collection.description" style="font-family: var(--urup-body, Inter, system-ui); font-size: 18px; line-height: 1.55; color: var(--urup-textMuted, #857c70); margin: 0; padding-bottom: 8px; max-width: 420px">
              {{ collection.description }}
            </p>
          </div>
        </div>
      </section>

      <section style="background: var(--urup-pageBg, #f6f3ee); padding: 64px 54px 120px">
        <div style="max-width: 1440px; margin: 0 auto">
          <div v-if="products.length === 0" style="padding: 80px 0; text-align: center; font-family: var(--urup-body, Inter, system-ui); color: var(--urup-textMuted, #857c70)">
            Ingen produkter i denne kollektion lige nu.
          </div>

          <div v-else class="urup-shop-grid urup-grid-4" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; row-gap: 56px">
            <NuxtLink
              v-for="product in products"
              :key="product.id"
              :to="`/shop/${collection.handle}/${product.handle}`"
              style="text-decoration: none; color: inherit; display: flex; flex-direction: column; gap: 18px"
            >
              <div style="background: #ede8df; aspect-ratio: 4/5; overflow: hidden; position: relative">
                <img v-if="product.image" :src="product.image" :alt="product.title" style="width: 100%; height: 100%; object-fit: cover; display: block" />
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--urup-textMuted, #857c70)">
                  {{ collection.title }}
                </div>
                <div class="urup-product-card-title" style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-style: italic; font-size: 22px; color: var(--urup-text, #1c1a17); letter-spacing: -0.015em; line-height: 1.2">
                  {{ product.title }}
                </div>
                <div class="urup-product-card-price" style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: var(--urup-text, #1c1a17)">
                  <span>{{ product.price }}</span>
                  <span style="font-size: 11px; color: #3a342c; letter-spacing: 0.04em">SE →</span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
