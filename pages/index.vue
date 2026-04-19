<script setup lang="ts">
import { upcomingDrops } from '~/data/drops'

const { data } = await useFetch('/api/products')
const products = computed(() => data.value?.products ?? [])
const heroDrop = upcomingDrops[0]
</script>

<template>
  <div class="container-shell space-y-10 py-10">
    <section class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div class="card overflow-hidden p-8 lg:p-12">
        <p class="text-sm uppercase tracking-[0.35em] text-stone-500">Gårdbutik · keramik · små serier</p>
        <h1 class="mt-4 max-w-2xl text-5xl leading-tight text-stone-900 md:text-6xl">
          En rolig Shopify-start til Urupgaard, klar til custom frontend bagefter.
        </h1>
        <p class="mt-6 max-w-xl text-lg leading-8 text-stone-600">
          Fokus i v1 er produkter, drops og en enkel butikoplevelse der kan udvides uden at skulle bygges om fra bunden.
        </p>
        <div class="mt-8 flex flex-wrap gap-4">
          <NuxtLink to="/collections/keramik" class="rounded-full bg-stone-900 px-6 py-3 text-sm text-white">Se keramik</NuxtLink>
          <NuxtLink to="/drops" class="rounded-full border border-stone-300 px-6 py-3 text-sm text-stone-800">Se næste drop</NuxtLink>
        </div>
      </div>

      <div class="card p-8">
        <p class="text-sm uppercase tracking-[0.35em] text-stone-500">Næste drop</p>
        <h2 class="mt-4 text-3xl text-stone-900">{{ heroDrop.title }}</h2>
        <p class="mt-3 text-stone-600">{{ heroDrop.description }}</p>
        <p class="mt-4 text-sm text-stone-500">{{ heroDrop.teaser }}</p>
        <div class="mt-6">
          <DropCountdown :target="heroDrop.launchAt" />
        </div>
      </div>
    </section>

    <section class="space-y-5">
      <div class="flex items-end justify-between gap-4">
        <div>
          <p class="text-sm uppercase tracking-[0.3em] text-stone-500">Udvalgte varer</p>
          <h2 class="mt-2 text-3xl text-stone-900">Klar til Shopify-data eller fallback produkter</h2>
        </div>
        <p class="text-sm text-stone-500">{{ data?.source === 'shopify' ? 'Henter fra Shopify' : 'Viser lokal fallback' }}</p>
      </div>

      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article v-for="product in products" :key="product.id" class="card overflow-hidden">
          <div class="aspect-[4/3] bg-stone-100">
            <img v-if="product.image" :src="product.image" :alt="product.title" class="h-full w-full object-cover" />
          </div>
          <div class="p-6">
            <h3 class="text-2xl text-stone-900">{{ product.title }}</h3>
            <p class="mt-3 line-clamp-3 text-sm leading-7 text-stone-600">{{ product.description }}</p>
            <div class="mt-6 flex items-center justify-between">
              <span class="text-lg text-stone-900">{{ product.price }}</span>
              <NuxtLink :to="`/products/${product.handle}`" class="text-sm uppercase tracking-[0.2em] text-stone-500">Åbn</NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
