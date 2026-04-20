<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="container-shell py-20 lg:py-32">
    <div class="mx-auto max-w-2xl text-center">
      <p class="editorial-kicker text-red-600">404</p>
      <h1 class="mt-4 text-6xl leading-tight text-stone-900">Siden blev ikke fundet</h1>
      <p class="mt-6 text-lg leading-8 text-stone-600">
        Beklager, vi kunne ikke finde siden du ledte efter. Det kan være at siden blev slettet, eller at adressen var forkert.
      </p>

      <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <NuxtLink to="/" class="pill-button-primary">Til forsiden</NuxtLink>
        <NuxtLink to="/shop" class="pill-button-secondary">Se shop</NuxtLink>
      </div>

      <div class="mt-16 rounded-3xl border border-black/8 bg-stone-50 p-10">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Måske søgte du efter</p>
        <div class="mt-6 space-y-4 text-left">
          <NuxtLink to="/shop/keramik-krus" class="block rounded-lg border border-stone-200 p-4 transition hover:border-stone-400 hover:bg-white">
            <p class="font-semibold text-stone-900">Keramik krus kollektion</p>
            <p class="mt-1 text-sm text-stone-600">Håndlavet keramik krus</p>
          </NuxtLink>
          <NuxtLink to="/drops" class="block rounded-lg border border-stone-200 p-4 transition hover:border-stone-400 hover:bg-white">
            <p class="font-semibold text-stone-900">Kommende drops</p>
            <p class="mt-1 text-sm text-stone-600">Se når nye produkter lanceres</p>
          </NuxtLink>
          <NuxtLink to="/cart" class="block rounded-lg border border-stone-200 p-4 transition hover:border-stone-400 hover:bg-white">
            <p class="font-semibold text-stone-900">Din kurv</p>
            <p class="mt-1 text-sm text-stone-600">Se hvad du har lagt i kurven</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
