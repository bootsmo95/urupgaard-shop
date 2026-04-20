<script setup lang="ts">
const route = useRoute()
const handle = computed(() => String(route.params.collection || 'collection'))
const { data, pending, error } = await useFetch(() => `/api/collections/${handle.value}`)

const collection = computed(() => {
  const col = data.value?.collection
  console.log('Collection computed:', col)
  return col
})

const products = computed(() => {
  const prods = data.value?.products ?? []
  console.log('Products computed:', prods, 'length:', prods.length)
  return prods
})

onMounted(() => {
  console.log('Collection page mounted')
  console.log('Handle:', handle.value)
  console.log('Data:', data.value)
  console.log('Collection:', collection.value)
  console.log('Products:', products.value)
})

watch(data, (newData) => {
  console.log('Data updated:', newData)
})
</script>

<template>
  <div class="container-shell py-8 lg:py-10">
    <!-- Loading state -->
    <div v-if="pending" class="mb-10 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-blue-800">
      <p class="font-semibold">Loader kollektion...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="mb-10 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
      <p class="font-semibold">Fejl:</p>
      <p class="mt-2 text-sm">{{ error }}</p>
    </div>

    <!-- No data state -->
    <div v-else-if="!collection" class="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
      <p class="font-semibold">Ingen data fundet</p>
      <p class="mt-2 text-sm">Handle: {{ handle }}</p>
      <p class="mt-2 text-sm">Response: {{ JSON.stringify(data, null, 2) }}</p>
    </div>

    <!-- Success state -->
    <div v-else>
      <NuxtLink to="/shop" class="mb-8 inline-flex items-center gap-2 text-sm text-stone-500 transition hover:text-stone-900">
        ← Tilbage til shop
      </NuxtLink>

      <div class="mb-10 space-y-3">
        <p class="editorial-kicker">Kollektion</p>
        <h1 class="text-6xl leading-none text-stone-900">{{ collection.title }}</h1>
        <p v-if="collection.description" class="max-w-2xl text-lg leading-8 text-stone-600">{{ collection.description }}</p>
      </div>

      <div v-if="products.length > 0" class="grid gap-5 grid-cols-2 lg:grid-cols-4">
        <NuxtLink
          v-for="product in products"
          :key="product.id"
          :to="`/shop/${collection.handle}/${product.handle}`"
          class="group product-card block"
        >
          <div class="overflow-hidden">
            <div class="image-shell aspect-[4/5]">
              <img v-if="product.image" :src="product.image" :alt="product.title" class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
            </div>
          </div>
          
          <div class="p-6">
            <p class="editorial-kicker">Keramik</p>
            <h3 class="mt-3 text-3xl leading-none text-stone-900 transition group-hover:text-stone-600">{{ product.title }}</h3>
            <p class="mt-3 line-clamp-2 text-sm leading-7 text-stone-600">{{ product.description }}</p>
            <div class="mt-6 flex items-center justify-between gap-3">
              <span class="text-base font-semibold text-stone-900">{{ product.price }}</span>
              <span class="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500 group-hover:text-stone-900">Se mere →</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="mt-10 rounded-3xl border border-black/8 bg-stone-50/50 p-12 text-center">
        <p class="text-lg text-stone-600">Ingen produkter i denne kollektion.</p>
      </div>
    </div>
  </div>
</template>
