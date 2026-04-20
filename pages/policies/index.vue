<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const { data: policiesData } = await useFetch('/api/policies')

const policies = computed(() => {
  const pols = policiesData.value?.policies || {}
  return [
    { key: 'privacyPolicy', label: 'Privatlivspolitik', icon: '🔒' },
    { key: 'termsOfService', label: 'Vilkår for brug', icon: '📋' },
    { key: 'refundPolicy', label: 'Returpolitik', icon: '↩️' },
    { key: 'shippingPolicy', label: 'Leveringspolitik', icon: '📦' },
    { key: 'subscriptionPolicy', label: 'Abonnementspolitik', icon: '🔄' }
  ].map(policy => ({
    ...policy,
    content: pols[policy.key as keyof typeof pols]
  }))
})

const selectedPolicy = ref<string | null>(null)

const activePolicy = computed(() => {
  if (!selectedPolicy.value) return null
  return policies.value.find(p => p.key === selectedPolicy.value)
})

onMounted(() => {
  if (policies.value[0]) {
    selectedPolicy.value = policies.value[0].key
  }
})
</script>

<template>
  <div class="container-shell py-20 lg:py-32">
    <div class="mx-auto max-w-4xl">
      <!-- Header -->
      <div class="mb-12 text-center">
        <p class="editorial-kicker">Juridisk</p>
        <h1 class="mt-4 text-5xl leading-tight text-stone-900">Vilkår & Politikker</h1>
        <p class="mt-6 text-lg text-stone-600">
          Læs vores politikker og vilkår for handel hos os
        </p>
      </div>

      <!-- Policy Tabs -->
      <div class="mb-8 flex flex-wrap gap-2">
        <button
          v-for="policy in policies"
          :key="policy.key"
          @click="selectedPolicy = policy.key"
          :class="[
            'flex items-center gap-2 rounded-full px-4 py-2 transition',
            selectedPolicy === policy.key
              ? 'bg-black text-white'
              : 'border border-stone-300 text-stone-900 hover:border-stone-400'
          ]"
        >
          <span>{{ policy.icon }}</span>
          <span class="font-medium">{{ policy.label }}</span>
        </button>
      </div>

      <!-- Policy Content -->
      <div v-if="activePolicy && activePolicy.content" class="rounded-3xl border border-stone-200 bg-white p-8 lg:p-12">
        <h2 class="mb-6 text-3xl font-semibold text-stone-900">
          {{ activePolicy.label }}
        </h2>

        <!-- RTE HTML Content -->
        <div
          class="prose prose-sm max-w-none text-stone-700"
          v-html="activePolicy.content.body"
        />

        <!-- Last Updated Info -->
        <div class="mt-8 border-t border-stone-200 pt-6">
          <p class="text-sm text-stone-500">
            Denne politik er hentet direkte fra Shopify og opdateres automatisk.
          </p>
        </div>
      </div>

      <!-- No Policy Message -->
      <div v-else class="rounded-3xl border border-stone-200 bg-stone-50 p-8 text-center">
        <p class="text-stone-600">Politikken blev ikke fundet. Prøv igen senere.</p>
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
