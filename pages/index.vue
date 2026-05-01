<script setup lang="ts">
const { data } = await useFetch('/api/products')
const products = computed(() => data.value?.products ?? [])
</script>

<template>
  <div style="background: var(--urup-pageBg, #f6f3ee); color: var(--urup-text, #1c1a17); min-height: 100vh">
    <!-- HERO (editorial split) -->
    <section style="background: var(--urup-pageBg, #f6f3ee)">
      <div class="urup-split-2 urup-hero-editorial" style="max-width: 1440px; margin: 0 auto; padding: 60px 54px 100px; display: grid; grid-template-columns: 1.15fr 1fr; gap: 60px; align-items: end">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 28px; font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70)">
            <span style="width: 24px; height: 1px; background: var(--urup-textMuted, #857c70)" />
            Forår 2026 · Ny serie
          </div>

          <h1 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-size: clamp(56px, 8vw, 132px); line-height: 0.92; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0">
            Drejet,<br />
            <em style="font-style: italic">brændt</em>,<br />
            sat på bord.
          </h1>

          <p style="margin-top: 36px; font-family: var(--urup-body, Inter, system-ui); font-size: 18px; line-height: 1.55; color: var(--urup-textMuted, #857c70); max-width: 460px">
            Linda drejer keramik på Urupgaard · én vase, én skål ad gangen. Sammen med brugskunst, blomster og kød fra gårdens egne dyr.
          </p>

          <div class="urup-hero-editorial-buttons" style="display: flex; gap: 14px; margin-top: 40px">
            <NuxtLink
              to="/shop"
              style="height: 52px; padding: 0 28px; border-radius: 999px; background: var(--urup-text, #1c1a17); color: var(--urup-pageBg, #f6f3ee); border: none; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; font-weight: 500; text-decoration: none; display: inline-flex; align-items: center; gap: 12px"
            >
              Se butikken <span style="transform: translateY(-1px)">→</span>
            </NuxtLink>
            <NuxtLink
              to="/drops"
              style="height: 52px; padding: 0 28px; border-radius: 999px; background: transparent; color: var(--urup-text, #1c1a17); border: 1px solid rgba(28, 26, 23, 0.25); font-family: var(--urup-body, Inter, system-ui); font-size: 14px; font-weight: 500; text-decoration: none; display: inline-flex; align-items: center; gap: 12px"
            >
              Næste drop <span style="transform: translateY(-1px)">→</span>
            </NuxtLink>
          </div>
        </div>

        <div style="position: relative; aspect-ratio: 4/5; overflow: hidden; background: #ede8df">
          <img
            src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1600&q=80"
            alt=""
            style="width: 100%; height: 100%; object-fit: cover; display: block"
          />
          <div style="position: absolute; bottom: 20px; left: 20px; right: 20px; background: rgba(246, 243, 238, 0.92); backdrop-filter: blur(8px); padding: 18px 22px; display: flex; justify-content: space-between; align-items: baseline; font-family: var(--urup-body, Inter, system-ui); font-size: 13px; color: var(--urup-text, #1c1a17)">
            <div>
              <div style="font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 4px">Udvalgt</div>
              <div style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 20px; font-weight: 500">Krus i nyt design</div>
            </div>
            <div style="font-size: 16px">399 kr.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- New drops (uses real Shopify products) -->
    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 120px 54px">
      <div style="max-width: 1440px; margin: 0 auto">
        <div class="urup-section-head" style="display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; margin-bottom: 56px">
          <div>
            <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 16px">Nye varer · Forår 2026</div>
            <h2 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-size: clamp(36px, 4.4vw, 64px); line-height: 1; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0; max-width: 760px">Friske fra ovnen</h2>
          </div>
          <NuxtLink to="/shop" style="font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: var(--urup-text, #1c1a17); text-decoration: none; border-bottom: 1px solid rgba(28,26,23,0.12); padding-bottom: 4px; white-space: nowrap">
            Se al keramik →
          </NuxtLink>
        </div>

        <div class="urup-grid-4" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 48px; row-gap: 56px">
          <NuxtLink
            v-for="p in products.slice(0, 8)"
            :key="p.id"
            :to="p.collectionHandle ? `/shop/${p.collectionHandle}/${p.handle}` : `/shop/keramik/${p.handle}`"
            style="text-decoration: none; color: inherit; display: flex; flex-direction: column; gap: 18px"
          >
            <div style="background: #ede8df; aspect-ratio: 4/5; overflow: hidden; position: relative">
              <img v-if="p.image" :src="p.image" :alt="p.title" style="width: 100%; height: 100%; object-fit: cover; display: block" />
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--urup-textMuted, #857c70)">
                {{ p.collectionTitle || 'Keramik' }}
              </div>
              <div style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-style: italic; font-size: 22px; color: var(--urup-text, #1c1a17); letter-spacing: -0.015em; line-height: 1.2">
                {{ p.title }}
              </div>
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: var(--urup-text, #1c1a17)">
                <span>{{ p.price }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
