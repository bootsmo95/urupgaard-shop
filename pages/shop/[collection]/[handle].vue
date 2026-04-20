<script setup lang="ts">
const route = useRoute()
const handle = computed(() => String(route.params.handle || 'produkt'))
const collection = computed(() => String(route.params.collection || 'collection'))

const { data } = await useFetch(() => `/api/products/${handle.value}`)
const { addToCart, loading } = useCart()
const selectedVariantId = ref<string | null>(null)
const addedMessage = ref('')
let addedTimer: ReturnType<typeof setTimeout> | undefined

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

  addedMessage.value = `${product.value.title} er lagt i kurven`

  if (addedTimer) clearTimeout(addedTimer)
  addedTimer = setTimeout(() => {
    addedMessage.value = ''
  }, 3500)
}

onBeforeUnmount(() => {
  if (addedTimer) clearTimeout(addedTimer)
})
</script>

<template>
  <div v-if="product" class="container-shell py-8 lg:py-10">
    <NuxtLink :to="`/shop/${collection}`" class="mb-8 inline-flex items-center gap-2 text-sm text-stone-500 transition hover:text-stone-900">
      ← Tilbage til kollektion
    </NuxtLink>

    <div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
      <ProductGallery :images="product.images" :title="product.title" />

      <div>
        <div>
          <NuxtLink :to="`/shop/${collection}`" class="editorial-kicker text-stone-500 hover:text-stone-900">
            {{ collection }}
          </NuxtLink>
          <h1 class="mt-4 text-6xl leading-none text-stone-900">{{ product.title }}</h1>
          
          <div class="mt-8 border-t border-black/8 pt-6">
            <p class="text-base leading-8 text-stone-700">{{ product.description }}</p>
          </div>

          <div class="mt-10 space-y-6">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Pris</p>
              <p class="mt-3 text-5xl text-stone-900">{{ selectedVariant?.price || product.price }}</p>
            </div>

            <div v-if="product.variants?.length > 1">
              <p class="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Variant</p>
              <select 
                v-model="selectedVariantId" 
                class="mt-3 w-full rounded-2xl border border-black/8 bg-white/80 px-4 py-3 text-stone-900 backdrop-blur"
              >
                <option v-for="variant in product.variants" :key="variant.id" :value="variant.id">
                  {{ variant.title }} · {{ variant.price }}
                </option>
              </select>
            </div>

            <div class="flex flex-col gap-3 pt-4">
              <button
                class="pill-button-primary w-full"
                :disabled="loading || !selectedVariantId"
                @click="onAddToCart"
              >
                {{ loading ? 'Tilføjer til kurven...' : 'Læg i kurven' }}
              </button>
              <NuxtLink to="/cart" class="pill-button-secondary w-full">Gå til kurven</NuxtLink>
            </div>

            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-y-2 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-2 opacity-0"
            >
              <div v-if="addedMessage" class="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-800 backdrop-blur">
                {{ addedMessage }}
              </div>
            </Transition>
          </div>
        </div>

        <div class="mt-10 border-t border-black/8 pt-10">
          <p class="editorial-kicker">Om denne vare</p>
          <div class="mt-6 grid gap-4 md:grid-cols-2">
            <div class="soft-panel p-5">
              <p class="text-sm font-semibold text-stone-900">Materiale</p>
              <p class="mt-2 text-sm text-stone-600">Høj-brand keramik med håndlavet finish.</p>
            </div>
            <div class="soft-panel p-5">
              <p class="text-sm font-semibold text-stone-900">Pleje</p>
              <p class="mt-2 text-sm text-stone-600">Velegnet til dagligt brug. Håndvask anbefales.</p>
            </div>
          </div>
        </div>

        <ProductReviews :product-id="product.id" />
      </div>
    </div>

    <RelatedProducts :current-handle="handle" :collection-handle="collection" :limit="5" />
  </div>
</template>
