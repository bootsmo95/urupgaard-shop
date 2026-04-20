<script setup lang="ts">
const route = useRoute()
const handle = computed(() => String(route.params.handle || 'produkt'))
const { data } = await useFetch('/api/products')
const { addToCart, loading } = useCart()

const product = computed(() => {
  const products = data.value?.products ?? []
  return products.find((entry: any) => entry.handle === handle.value) ?? products[0]
})

async function onAddToCart() {
  if (!product.value?.variantId) return

  await addToCart({
    merchandiseId: product.value.variantId,
    quantity: 1,
    title: product.value.title,
    price: product.value.price,
    image: product.value.image
  })

  await navigateTo('/cart')
}
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
          <button
            class="rounded-full bg-stone-900 px-6 py-3 text-sm text-white disabled:opacity-50"
            :disabled="loading || !product.variantId"
            @click="onAddToCart"
          >
            {{ loading ? 'Lægger i kurv...' : 'Læg i kurv' }}
          </button>
        </div>
        <div class="mt-8 rounded-[24px] bg-stone-50 p-5 text-sm leading-7 text-stone-600">
          V1 bruger Shopify cart og redirecter checkout til Shopify. Det holder setup let og driftssikkert.
        </div>
      </div>
    </div>
  </div>
</template>
