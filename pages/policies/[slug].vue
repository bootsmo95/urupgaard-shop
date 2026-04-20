<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const slug = computed(() => String(route.params.slug || 'privacy'))

// Map slugs to policy keys
const policyMap: Record<string, string> = {
  'privacy': 'privacyPolicy',
  'terms': 'termsOfService',
  'returns': 'refundPolicy',
  'shipping': 'shippingPolicy',
  'subscription': 'subscriptionPolicy'
}

const policyKey = computed(() => policyMap[slug.value] || 'privacyPolicy')

const { data: policiesData } = await useFetch('/api/policies')

const policy = computed(() => {
  const policies = policiesData.value?.policies || {}
  return policies[policyKey.value as keyof typeof policies] || null
})

// Get friendly label
const label = computed(() => {
  const labels: Record<string, string> = {
    'privacyPolicy': 'Privatlivspolitik',
    'termsOfService': 'Vilkår for brug',
    'refundPolicy': 'Returpolitik',
    'shippingPolicy': 'Leveringspolitik',
    'subscriptionPolicy': 'Abonnementspolitik'
  }
  return labels[policyKey.value] || 'Politik'
})
</script>

<template>
  <div class="container-shell py-20 lg:py-32">
    <div class="mx-auto max-w-3xl">
      <!-- Header -->
      <div class="mb-12">
        <NuxtLink
          to="/policies"
          class="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 mb-4"
        >
          ← Tilbage til vilkår
        </NuxtLink>

        <h1 class="text-5xl leading-tight text-stone-900">
          {{ label }}
        </h1>
      </div>

      <!-- Policy Content -->
      <div v-if="policy" class="rounded-3xl border border-stone-200 bg-white p-8 lg:p-12">
        <div
          class="prose prose-sm max-w-none text-stone-700"
          v-html="policy.body"
        />

        <!-- Last Updated Info -->
        <div class="mt-8 border-t border-stone-200 pt-6">
          <p class="text-sm text-stone-500">
            Denne politik er hentet direkte fra Shopify og opdateres automatisk.
          </p>
        </div>
      </div>

      <!-- Not Found -->
      <div v-else class="rounded-3xl border border-stone-200 bg-stone-50 p-8 text-center">
        <p class="text-stone-600">Politikken blev ikke fundet.</p>
        <NuxtLink to="/policies" class="mt-4 inline-block text-black underline hover:no-underline">
          Se alle politikker
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.prose) {
  @apply text-stone-700;
}

:deep(.prose h1) {
  @apply text-2xl font-bold text-stone-900;
}

:deep(.prose h2) {
  @apply text-xl font-bold text-stone-900 mt-6 mb-3;
}

:deep(.prose h3) {
  @apply text-lg font-semibold text-stone-900 mt-4 mb-2;
}

:deep(.prose p) {
  @apply mb-4 leading-relaxed;
}

:deep(.prose ul) {
  @apply list-disc list-inside mb-4 space-y-2;
}

:deep(.prose ol) {
  @apply list-decimal list-inside mb-4 space-y-2;
}

:deep(.prose li) {
  @apply text-stone-700;
}

:deep(.prose a) {
  @apply text-black underline hover:no-underline;
}

:deep(.prose strong) {
  @apply font-semibold text-stone-900;
}
</style>
