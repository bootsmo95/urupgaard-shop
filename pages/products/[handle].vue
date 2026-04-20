<script setup lang="ts">
const route = useRoute()
const handle = computed(() => String(route.params.handle || 'produkt'))
const { data } = await useFetch(() => `/api/products/${handle.value}`)
const { addToCart, loading } = useCart()
const selectedVariantId = ref<string | null>(null)

const product = computed(() => data.value?.product)

watchEffect(() => {
  const firstVariant = product.value?.variants?.[0]
  selectedVariantId.value = firstVariant?.id ?? product.value?.variantId ?? null
})

const selectedVariant = computed(() => {
  return product.value?.variants?.find((variant: any) => variant.id === selectedVariantId.value) ?? product.value?.variants?.[0]
})

async function onAddToCart() {
  if (!selectedVariantId.value || !product.value) return

  await addToCart({
    merchandiseId: selectedVariantId.value,
    quantity: 1,
    title: product.value.title,
    price: selectedVariant.value?.price || product.value.price,
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

        <div v-if="product.variants?.length > 1" class="mt-8">
          <label class="mb-2 block text-sm uppercase tracking-[0.2em] text-stone-500">Variant</label>
          <select v-model="selectedVariantId" class="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900">
            <option v-for="variant in product.variants" :key="variant.id" :value="variant.id">
              {{ variant.title }} · {{ variant.price }}
            </option>
          </select>
        </div>

        <div class="mt-8 flex items-end justify-between gap-4">
          <span class="text-3xl text-stone-900">{{ selectedVariant?.price || product.price }}</span>
          <button
            class="rounded-full bg-stone-900 px-6 py-3 text-sm text-white disabled:opacity-50"
            :disabled="loading || !selectedVariantId"
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
