<script setup lang="ts">
import { upcomingDrops } from '~/data/drops'

const { data } = await useFetch('/api/products')
const products = computed(() => data.value?.products ?? [])
const heroDrop = upcomingDrops[0]
</script>

<template>
  <div class="container-shell py-8 lg:py-10">
    <section class="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div class="card overflow-hidden p-8 lg:p-12">
        <div class="max-w-3xl">
          <p class="editorial-kicker">Håndlavet keramik · små serier · moderne gårdbutik</p>
          <h1 class="mt-5 text-6xl leading-[0.92] text-stone-900 md:text-7xl xl:text-[6.25rem]">
            Stille luksus til bordet, formet i ler og ild.
          </h1>
          <p class="mt-6 max-w-xl text-base leading-8 text-stone-600 md:text-lg">
            Urupgaard samler keramik, små drops og rolige kollektioner i et storefront der føles let, moderne og varmt.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink to="/shop" class="pill-button-primary">Shop kollektionen</NuxtLink>
            <NuxtLink to="/drops" class="pill-button-secondary">Se næste drop</NuxtLink>
          </div>
        </div>

        <div class="mt-10 grid gap-4 md:grid-cols-3">
          <div class="soft-panel p-5">
            <p class="editorial-kicker">Kurateret</p>
            <p class="mt-3 text-sm leading-7 text-stone-700">Små serier med fokus på form, ro og materialitet.</p>
          </div>
          <div class="soft-panel p-5">
            <p class="editorial-kicker">Drops</p>
            <p class="mt-3 text-sm leading-7 text-stone-700">Nye lanceringer og sæsonudgivelser med countdown.</p>
          </div>
          <div class="soft-panel p-5">
            <p class="editorial-kicker">Shopify</p>
            <p class="mt-3 text-sm leading-7 text-stone-700">Stabil backend med custom frontend og enkel checkout.</p>
          </div>
        </div>
      </div>

      <div class="card flex flex-col justify-between overflow-hidden p-8 lg:p-10">
        <div>
          <p class="editorial-kicker">Næste drop</p>
          <h2 class="mt-4 text-4xl leading-tight text-stone-900">{{ heroDrop.title }}</h2>
          <p class="mt-4 text-base leading-8 text-stone-600">{{ heroDrop.description }}</p>
          <p class="mt-5 text-sm text-stone-500">{{ heroDrop.teaser }}</p>
        </div>

        <div class="mt-8">
          <DropCountdown :target="heroDrop.launchAt" />
        </div>
      </div>
    </section>

    <section class="mt-8 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
      <div class="card p-8 lg:p-10">
        <p class="editorial-kicker">Urupgaard universet</p>
        <h2 class="mt-4 text-5xl leading-none text-stone-900">En mere modepræget butik, men stadig jordnær.</h2>
        <p class="mt-5 text-base leading-8 text-stone-600">
          Inspirationen er clean fashion ecommerce, men udtrykket er holdt varmt, blødt og taktilt så det passer til keramik og gårdbutik.
        </p>
      </div>

      <div class="grid gap-5 md:grid-cols-2">
        <NuxtLink
          v-for="product in products"
          :key="product.id"
          :to="`/shop/keramik/${product.handle}`"
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
    </section>
  </div>
</template>
