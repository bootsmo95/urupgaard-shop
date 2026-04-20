<script setup lang="ts">
const route = useRoute()
const handle = computed(() => String(route.params.handle || 'collection'))
const { data } = await useFetch(() => `/api/collections/${handle.value}`)

const collection = computed(() => data.value?.collection)
const products = computed(() => collection.value?.products ?? [])
</script>

<template>
  <div v-if="collection" class="container-shell py-8 lg:py-10">
    <div class="mb-10 space-y-3">
      <p class="editorial-kicker">Kollektion</p>
      <h1 class="text-6xl leading-none text-stone-900">{{ collection.title }}</h1>
      <p v-if="collection.description" class="max-w-2xl text-lg leading-8 text-stone-600">{{ collection.description }}</p>
    </div>

    <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <article v-for="product in products" :key="product.id" class="product-card">
        <NuxtLink :to="`/products/${product.handle}`" class="block overflow-hidden">
          <div class="image-shell aspect-[4/5]">
            <img v-if="product.image" :src="product.image" :alt="product.title" class="h-full w-full object-cover transition duration-500 hover:scale-[1.03]" />
          </div>
        </NuxtLink>
        
        <div class="p-6">
          <p class="editorial-kicker">Keramik</p>
          <NuxtLink :to="`/products/${product.handle}`">
            <h3 class="mt-3 text-3xl leading-none text-stone-900 transition hover:text-stone-600">{{ product.title }}</h3>
          </NuxtLink>
          <p class="mt-3 line-clamp-2 text-sm leading-7 text-stone-600">{{ product.description }}</p>
          <div class="mt-6 flex items-center justify-between gap-3">
            <span class="text-base font-semibold text-stone-900">{{ product.price }}</span>
            <NuxtLink :to="`/products/${product.handle}`" class="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500 transition hover:text-stone-900">Se mere</NuxtLink>
          </div>
        </div>
      </article>
    </div>

    <div v-if="products.length === 0" class="mt-10 rounded-3xl border border-black/8 bg-stone-50/50 p-12 text-center">
      <p class="text-lg text-stone-600">Ingen produkter i denne kollektion endnu.</p>
    </div>
  </div>
</template>
