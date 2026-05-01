<script setup lang="ts">
const { data: collectionsData } = await useFetch('/api/collections')

const collections = computed(() => collectionsData.value?.collections ?? [])
</script>

<template>
  <div style="background: var(--urup-pageBg, #f6f3ee); color: var(--urup-text, #1c1a17); min-height: 100vh">
    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 60px 54px 80px; border-bottom: 1px solid rgba(28,26,23,0.12)">
      <div style="max-width: 1440px; margin: 0 auto">
        <div style="display: flex; gap: 8px; font-family: var(--urup-body, Inter, system-ui); font-size: 13px; color: var(--urup-textMuted, #857c70); margin-bottom: 32px">
          <NuxtLink to="/" style="color: inherit; text-decoration: none">Forside</NuxtLink>
          <span style="opacity: 0.5">/</span>
          <span style="color: var(--urup-text, #1c1a17)">Butik</span>
        </div>

        <div class="urup-page-head urup-split-2" style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 80px; align-items: end">
          <div>
            <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 24px">
              Hele værkstedet · {{ collections.length }} kollektioner
            </div>
            <h1 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-style: italic; font-size: clamp(44px, 6vw, 96px); line-height: 0.95; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0">
              Drejet i <span style="font-style: italic">Urup</span>,<br />
              solgt til dig.
            </h1>
          </div>
          <p style="font-family: var(--urup-body, Inter, system-ui); font-size: 18px; line-height: 1.55; color: var(--urup-textMuted, #857c70); margin: 0; padding-bottom: 8px; max-width: 420px">
            Stentøj fra mit værksted i den gamle stald. Hverdagsserier til genbestilling, Aske-serien i små oplag, og Unika der kun findes ét eksemplar af.
          </p>
        </div>
      </div>
    </section>

    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 64px 54px 120px">
      <div style="max-width: 1440px; margin: 0 auto">
        <div class="urup-grid-4" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; row-gap: 56px">
          <NuxtLink
            v-for="collection in collections.slice(0, 6)"
            :key="collection.id"
            :to="`/shop/${collection.handle}`"
            style="text-decoration: none; color: inherit; display: flex; flex-direction: column; gap: 18px"
          >
            <div style="background: #ede8df; aspect-ratio: 4/5; overflow: hidden; position: relative">
              <img v-if="collection.image" :src="collection.image" :alt="collection.title" style="width: 100%; height: 100%; object-fit: cover; display: block" />
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--urup-textMuted, #857c70)">
                Kollektion
              </div>
              <div class="urup-product-card-title" style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-style: italic; font-size: 22px; color: var(--urup-text, #1c1a17); letter-spacing: -0.015em; line-height: 1.2">
                {{ collection.title }}
              </div>
              <div class="urup-product-card-price" style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: var(--urup-text, #1c1a17)">
                <span v-if="collection.productsCount != null">{{ collection.productsCount }} stk</span>
                <span style="font-size: 11px; color: #3a342c; letter-spacing: 0.04em">SE →</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
