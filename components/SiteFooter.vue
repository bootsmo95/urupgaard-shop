<script setup lang="ts">
const { data: shopData } = await useFetch('/api/shop-info')

const shop = computed<{
  name?: string
  description?: string
  email?: string
  phone?: string
}>(() => (shopData.value?.shop as any) || {})

const currentYear = new Date().getFullYear()

// Contact info - edit these in Shopify admin under Shop Settings
const contactInfo = computed(() => ({
  name: shop.value.name || 'Urupgaard',
  email: shop.value.email,
  phone: shop.value.phone,
  // Add custom fields here - these should ideally come from Shopify's public metafields
  cvr: 'CVR: (Opdater i Shopify)', // You'll need to add this as a metafield in Shopify
  address: 'Adresse: (Opdater i Shopify)' // You'll need to add this as a metafield in Shopify
}))

const policyLinks = computed(() => [
  { label: 'Privatlivspolitik', href: '/policies/privacy' },
  { label: 'Vilkår', href: '/policies/terms' },
  { label: 'Returpolitik', href: '/policies/returns' },
  { label: 'Leveringspolitik', href: '/policies/shipping' }
])
</script>

<template>
  <footer style="background: #1c1a17; color: #f6f3ee; padding: 100px 54px 40px">
    <div style="max-width: 1440px; margin: 0 auto">
      <div class="urup-footer-grid" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; padding-bottom: 80px; border-bottom: 1px solid rgba(245,237,224,0.18)">
        <div>
          <div style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-weight: 500; font-size: 40px; letter-spacing: -0.015em">{{ contactInfo.name }}</div>
          <p style="margin-top: 20px; font-family: var(--urup-body, Inter, system-ui); font-size: 15px; line-height: 1.6; opacity: 0.7; max-width: 380px">
            {{ shop.description || 'En lille gård i Urup. Håndlavet keramik, brugskunst, blomster og kød fra egne dyr.' }}
          </p>

          <div style="margin-top: 32px">
            <NewsletterSignup />
          </div>
        </div>

        <div>
          <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.5; margin-bottom: 20px">Butik</div>
          <div style="display: flex; flex-direction: column; gap: 12px">
            <NuxtLink to="/shop" style="color: inherit; text-decoration: none; font-family: var(--urup-body, Inter, system-ui); font-size: 15px; opacity: 0.85">Shop</NuxtLink>
            <NuxtLink to="/cart" style="color: inherit; text-decoration: none; font-family: var(--urup-body, Inter, system-ui); font-size: 15px; opacity: 0.85">Kurv</NuxtLink>
            <NuxtLink to="/drops" style="color: inherit; text-decoration: none; font-family: var(--urup-body, Inter, system-ui); font-size: 15px; opacity: 0.85">Drops</NuxtLink>
          </div>
        </div>

        <div>
          <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.5; margin-bottom: 20px">Kunde</div>
          <div style="display: flex; flex-direction: column; gap: 12px">
            <NuxtLink
              v-for="policy in policyLinks"
              :key="policy.href"
              :to="policy.href"
              style="color: inherit; text-decoration: none; font-family: var(--urup-body, Inter, system-ui); font-size: 15px; opacity: 0.85"
            >
              {{ policy.label }}
            </NuxtLink>
            <NuxtLink to="/contact" style="color: inherit; text-decoration: none; font-family: var(--urup-body, Inter, system-ui); font-size: 15px; opacity: 0.85">Kontakt</NuxtLink>
          </div>
        </div>

        <div>
          <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.5; margin-bottom: 20px">Kontakt</div>
          <div style="display: flex; flex-direction: column; gap: 12px">
            <a v-if="contactInfo.email" :href="`mailto:${contactInfo.email}`" style="color: inherit; text-decoration: none; font-family: var(--urup-body, Inter, system-ui); font-size: 15px; opacity: 0.85">{{ contactInfo.email }}</a>
            <a v-if="contactInfo.phone" :href="`tel:${contactInfo.phone}`" style="color: inherit; text-decoration: none; font-family: var(--urup-body, Inter, system-ui); font-size: 15px; opacity: 0.85">{{ contactInfo.phone }}</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none; font-family: var(--urup-body, Inter, system-ui); font-size: 15px; opacity: 0.85">Instagram</a>
          </div>
        </div>
      </div>

      <div class="urup-footer-bottom" style="padding-top: 32px; display: flex; justify-content: space-between; align-items: center; font-family: var(--urup-body, Inter, system-ui); font-size: 13px; opacity: 0.5; gap: 18px">
        <span>© {{ currentYear }} {{ contactInfo.name }}</span>
        <span v-if="contactInfo.cvr">{{ contactInfo.cvr }}</span>
        <span v-if="contactInfo.address">{{ contactInfo.address }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
:deep(input),
:deep(button) {
  font-family: var(--urup-body, Inter, system-ui);
}

:deep(a) {
  transition: opacity 0.15s ease;
}

:deep(a:hover) {
  opacity: 1;
}

:deep(.urup-footer-grid a) {
  opacity: 0.85;
}

:deep(.urup-footer-grid a:hover) {
  opacity: 1;
}
</style>
