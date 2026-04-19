<script setup lang="ts">
const route = useRoute()
const handle = computed(() => String(route.params.handle || 'produkt'))
const { data } = await useFetch('/api/products')

const product = computed(() => {
  const products = data.value?.products ?? []
  return products.find((entry: any) => entry.handle === handle.value) ?? products[0]
})
</script>

<template>
  <div v-if="product" class="container-shell py-10">
    <div class="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div class="card overflow-hidden">
        <div class="aspect-square bg-stone-100">
          <img v-if="product.image" :src="product.image" :alt="product.title" class="h-full w-full object-cover" />
        </div>
      </div>

      <div class="card p-8 lg:p-10">
        <p class="text-sm uppercase tracking-[0.3em] text-stone-500">Keramik</p>
        <h1 class="mt-3 text-5xl text-stone-900">{{ product.title }}</h1>
        <p class="mt-6 text-lg leading-8 text-stone-600">{{ product.description }}</p>
        <div class="mt-8 flex items-end justify-between gap-4">
          <span class="text-3xl text-stone-900">{{ product.price }}</span>
          <button class="rounded-full bg-stone-900 px-6 py-3 text-sm text-white">Læg i kurv</button>
        </div>
        <div class="mt-8 rounded-[24px] bg-stone-50 p-5 text-sm leading-7 text-stone-600">
          Placeholder til Shopify cart og variant-logik. Checkout beholdes i Shopify for lav kompleksitet.
        </div>
      </div>
    </div>
  </div>
</template>
