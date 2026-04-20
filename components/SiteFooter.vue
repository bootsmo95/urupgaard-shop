<script setup lang="ts">
const { data: shopData } = await useFetch('/api/shop-info')

const shop = computed(() => shopData.value?.shop || {})

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
  <footer class="border-t border-stone-200 bg-stone-50">
    <div class="container-shell py-16 lg:py-20">
      <div class="mb-12 max-w-2xl">
        <NewsletterSignup />
      </div>

      <!-- Main Footer Grid -->
      <div class="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <!-- Brand Column -->
        <div>
          <h3 class="font-semibold text-stone-900 mb-4">{{ contactInfo.name }}</h3>
          <p class="mb-6 text-sm text-stone-600">
            {{ shop.description || 'Handlavet keramik og drikkeware af høj kvalitet' }}
          </p>
          <div class="space-y-2 text-sm text-stone-600">
            <p v-if="contactInfo.email">
              <a :href="`mailto:${contactInfo.email}`" class="hover:text-stone-900 underline">
                {{ contactInfo.email }}
              </a>
            </p>
            <p v-if="contactInfo.phone">
              <a :href="`tel:${contactInfo.phone}`" class="hover:text-stone-900 underline">
                {{ contactInfo.phone }}
              </a>
            </p>
          </div>
        </div>

        <!-- Policies Column -->
        <div>
          <h4 class="font-semibold text-stone-900 mb-4">Juridisk</h4>
          <ul class="space-y-2">
            <li v-for="policy in policyLinks" :key="policy.href">
              <NuxtLink
                :to="policy.href"
                class="text-sm text-stone-600 hover:text-stone-900 transition"
              >
                {{ policy.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Shop Column -->
        <div>
          <h4 class="font-semibold text-stone-900 mb-4">Shop</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/shop" class="text-sm text-stone-600 hover:text-stone-900 transition">
                Se produkter
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cart" class="text-sm text-stone-600 hover:text-stone-900 transition">
                Din kurv
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/drops" class="text-sm text-stone-600 hover:text-stone-900 transition">
                Kommende drops
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-sm text-stone-600 hover:text-stone-900 transition">
                Om os
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Business Info Column -->
        <div>
          <h4 class="font-semibold text-stone-900 mb-4">Virksomhedsinfo</h4>
          <div class="space-y-3 text-sm text-stone-600">
            <p v-if="contactInfo.cvr" class="text-xs">
              {{ contactInfo.cvr }}
            </p>
            <p v-if="contactInfo.address" class="text-xs">
              {{ contactInfo.address }}
            </p>
            <p class="text-xs pt-2 border-t border-stone-300">
              <em>Tip: Opdater CVR og adresse i Shopify Admin</em>
            </p>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-stone-200 pt-8">
        <!-- Bottom Footer -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p class="text-xs text-stone-600">
            © {{ currentYear }} {{ contactInfo.name }}. Alle rettigheder forbeholdt.
          </p>

          <!-- Social Links (optional) -->
          <div class="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-stone-600 hover:text-stone-900 transition"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Dev Note -->
    <div class="bg-yellow-50 border-t border-yellow-200 px-4 py-2 text-xs text-yellow-800">
      <p>
        💡 <strong>Tip:</strong> Opdater CVR og adresse ved at tilføje dem som metafields i Shopify Admin.
        Eller rediger direkte i SiteFooter.vue komponenten.
      </p>
    </div>
  </footer>
</template>

<style scoped>
:deep(.container-shell) {
  @apply mx-auto max-w-7xl px-6;
}
</style>
