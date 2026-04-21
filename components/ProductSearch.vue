<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface SearchProduct {
  id: string
  handle: string
  title: string
  description?: string
  price: string
  image?: string
  variantId?: string
  tags?: string[]
  collectionHandle?: string
  collectionTitle?: string
}

interface SearchResponse {
  source: string
  products: SearchProduct[]
  availableTags: string[]
}

const search = ref('')
const debouncedSearch = ref('')
const selectedTags = ref<string[]>([])

// Simple debounce (no external deps)
let debounceTimer: ReturnType<typeof setTimeout> | undefined
watch(search, (value) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    debouncedSearch.value = value
  }, 250)
}, { flush: 'post' })

const params = computed(() => ({
  q: debouncedSearch.value || undefined,
  tags: selectedTags.value.length ? selectedTags.value.join(',') : undefined
}))

const { data, pending, error } = await useFetch<SearchResponse>('/api/products/search', {
  query: params,
  default: () => ({
    source: 'fallback',
    products: [],
    availableTags: []
  }),
  watch: [params]
})

const products = computed(() => data.value?.products ?? [])
const availableTags = computed(() => data.value?.availableTags ?? [])
const hasActiveFilters = computed(() => Boolean(search.value.trim()) || selectedTags.value.length > 0)

function toggleTag(tag: string) {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((item) => item !== tag)
    return
  }

  selectedTags.value = [...selectedTags.value, tag]
}

function resetFilters() {
  search.value = ''
  debouncedSearch.value = ''
  selectedTags.value = []
}

watch(availableTags, (tags) => {
  selectedTags.value = selectedTags.value.filter((tag) => tags.includes(tag))
})
</script>

<template>
  <section class="space-y-6">
    <div class="card overflow-hidden p-6 sm:p-8">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div class="max-w-2xl space-y-3">
          <p class="editorial-kicker">Find din favorit</p>
          <h2 class="text-4xl leading-none text-stone-900 sm:text-5xl">Søg blandt keramikken</h2>
          <p class="max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
            Filtrér efter stemning, serie eller funktion, og find hurtigere frem til det rigtige stykke.
          </p>
        </div>

        <button
          v-if="hasActiveFilters"
          type="button"
          class="pill-button-secondary w-full sm:w-auto"
          @click="resetFilters"
        >
          Nulstil filtre
        </button>
      </div>

      <div class="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <label class="group flex items-center gap-3 rounded-[24px] border border-black/10 bg-white/70 px-5 py-4 transition focus-within:border-stone-400 focus-within:bg-white">
          <span class="text-stone-400 transition group-focus-within:text-stone-700">⌕</span>
          <input
            v-model="search"
            type="search"
            name="search"
            placeholder="Søg efter kopper, fade, farver eller former"
            class="w-full bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
          />
        </label>

        <div class="rounded-[24px] border border-black/10 bg-white/55 px-4 py-4">
          <p class="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Tags</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in availableTags"
              :key="tag"
              type="button"
              class="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition"
              :class="selectedTags.includes(tag)
                ? 'border-stone-900 bg-stone-900 text-white'
                : 'border-black/10 bg-white/70 text-stone-600 hover:border-stone-400 hover:text-stone-900'"
              @click="toggleTag(tag)"
            >
              {{ tag }}
            </button>
            <p v-if="!availableTags.length && !pending" class="text-sm text-stone-500">Ingen tags fundet endnu.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between gap-4 px-1">
      <div>
        <p class="editorial-kicker">Produktoversigt</p>
        <p class="mt-2 text-sm text-stone-600">
          <span class="font-semibold text-stone-900">{{ products.length }}</span>
          {{ products.length === 1 ? 'produkt matcher' : 'produkter matcher' }}
        </p>
      </div>
      <p v-if="pending" class="text-sm text-stone-500">Opdaterer søgeresultat...</p>
    </div>

    <div v-if="error" class="rounded-[28px] border border-red-200 bg-red-50 p-6 text-sm text-red-700">
      Vi kunne ikke hente søgeresultater lige nu.
    </div>

    <div v-else-if="products.length" class="grid gap-5 grid-cols-2 lg:grid-cols-4">
      <NuxtLink
        v-for="product in products"
        :key="product.id"
        :to="product.collectionHandle ? `/shop/${product.collectionHandle}/${product.handle}` : `/shop/keramik/${product.handle}`"
        class="group product-card block"
      >
        <div class="overflow-hidden">
          <div class="image-shell aspect-[4/5]">
            <img
              v-if="product.image"
              :src="product.image"
              :alt="product.title"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </div>

        <div class="p-6">
          <p class="editorial-kicker">{{ product.collectionTitle || 'Keramik' }}</p>
          <h3 class="mt-3 text-3xl leading-none text-stone-900 transition group-hover:text-stone-600">{{ product.title }}</h3>
          <p class="mt-3 line-clamp-2 text-sm leading-7 text-stone-600">{{ product.description }}</p>
          <div v-if="product.tags?.length" class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tag in product.tags.slice(0, 3)"
              :key="tag"
              class="rounded-full bg-stone-900/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500"
            >
              {{ tag }}
            </span>
          </div>
          <div class="mt-6 flex items-center justify-between gap-3">
            <span class="text-base font-semibold text-stone-900">{{ product.price }}</span>
            <span class="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500 group-hover:text-stone-900">Se mere →</span>
          </div>
        </div>
      </NuxtLink>
    </div>

    <div v-else class="rounded-[30px] border border-black/8 bg-stone-50/70 p-10 text-center">
      <p class="text-2xl text-stone-900">Ingen produkter matcher lige nu.</p>
      <p class="mt-3 text-sm leading-7 text-stone-600">
        Prøv en anden søgning eller fjern et par filtre, så finder vi mere keramik frem.
      </p>
    </div>
  </section>
</template>
