<script setup lang="ts">
const route = useRoute()
const handle = computed(() => String(route.params.handle || 'keramik'))
const { data } = await useFetch('/api/products')
const products = computed(() => data.value?.products ?? [])
</script>

<template>
  <div class="container-shell py-10">
    <div class="card p-8 lg:p-12">
      <p class="text-sm uppercase tracking-[0.3em] text-stone-500">Kollektion</p>
      <h1 class="mt-3 text-5xl capitalize text-stone-900">{{ handle }}</h1>
      <p class="mt-4 max-w-2xl text-lg text-stone-600">
        Midlertidig collection-side. Næste step er at koble rigtige Shopify collections på Storefront API.
      </p>
    </div>

    <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <article v-for="product in products" :key="product.id" class="card overflow-hidden">
        <div class="aspect-[4/3] bg-stone-100">
          <img v-if="product.image" :src="product.image" :alt="product.title" class="h-full w-full object-cover" />
        </div>
        <div class="p-6">
          <h2 class="text-2xl text-stone-900">{{ product.title }}</h2>
          <p class="mt-3 line-clamp-3 text-sm leading-7 text-stone-600">{{ product.description }}</p>
          <div class="mt-6 flex items-center justify-between">
            <span class="text-lg text-stone-900">{{ product.price }}</span>
            <NuxtLink :to="`/products/${product.handle}`" class="text-sm uppercase tracking-[0.2em] text-stone-500">Åbn</NuxtLink>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
