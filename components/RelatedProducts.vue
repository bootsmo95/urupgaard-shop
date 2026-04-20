<script setup lang="ts">
interface RelatedProduct {
  id: string
  handle: string
  title: string
  description?: string
  price: string
  image?: string
  collectionHandle?: string | null
}

const props = defineProps<{
  currentHandle: string
  collectionHandle?: string
  title?: string
  limit?: number
}>()

const sectionTitle = computed(() => props.title ?? 'Se også')
const requestLimit = computed(() => props.limit ?? 4)

const { data, pending, error } = await useFetch(() => `/api/products/${props.currentHandle}/related`, {
  query: {
    limit: requestLimit.value
  },
  default: () => ({ products: [] as RelatedProduct[] })
})

const products = computed<RelatedProduct[]>(() => data.value?.products ?? [])

function productLink(product: RelatedProduct) {
  const collectionHandle = product.collectionHandle || props.collectionHandle
  return collectionHandle
    ? `/shop/${collectionHandle}/${product.handle}`
    : `/products/${product.handle}`
}
</script>

<template>
  <section v-if="products.length || pending" class="mt-16 border-t border-black/8 pt-10 lg:mt-20 lg:pt-14">
    <div class="flex items-end justify-between gap-4">
      <div>
        <p class="editorial-kicker">Håndplukket inspiration</p>
        <h2 class="mt-3 text-4xl leading-none text-stone-900 md:text-5xl">{{ sectionTitle }}</h2>
      </div>
      <NuxtLink to="/shop" class="hidden text-sm font-semibold uppercase tracking-[0.18em] text-stone-500 transition hover:text-stone-900 md:inline-flex">
        Se hele shoppen →
      </NuxtLink>
    </div>

    <div v-if="pending" class="mt-8 grid gap-5 grid-cols-2 lg:grid-cols-4">
      <div v-for="index in requestLimit" :key="index" class="product-card overflow-hidden">
        <div class="image-shell aspect-[4/5] animate-pulse bg-stone-100" />
        <div class="space-y-3 p-6">
          <div class="h-3 w-24 rounded-full bg-stone-100" />
          <div class="h-8 w-3/4 rounded-full bg-stone-100" />
          <div class="h-4 w-full rounded-full bg-stone-100" />
          <div class="h-4 w-2/3 rounded-full bg-stone-100" />
        </div>
      </div>
    </div>

    <div v-else-if="products.length" class="mt-8 grid gap-5 grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      <NuxtLink
        v-for="product in products"
        :key="product.id"
        :to="productLink(product)"
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

    <p v-else-if="error" class="mt-6 text-sm text-stone-500">Kunne ikke hente relaterede produkter lige nu.</p>
  </section>
</template>
