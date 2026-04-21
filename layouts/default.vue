<script setup lang="ts">
const searchOpen = ref(false)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="sticky top-0 z-40 border-b border-black/5 bg-[#f7f3ed]/80 backdrop-blur-xl">
      <div class="container-shell flex items-center justify-between py-4">
        <NuxtLink to="/" class="flex flex-col leading-none">
          <span class="text-[10px] uppercase tracking-[0.45em] text-stone-500">Urupgaard</span>
          <span class="mt-0.5 text-xl font-semibold text-stone-900">Keramik</span>
        </NuxtLink>

        <div class="flex items-center gap-4 md:gap-8">
          <NuxtLink to="/shop" class="text-sm text-stone-700 transition hover:text-stone-900">
            Shop
          </NuxtLink>
          <NuxtLink to="/drops" class="text-sm text-stone-700 transition hover:text-stone-900">
            Drops
          </NuxtLink>
          <NuxtLink to="/contact" class="text-sm text-stone-700 transition hover:text-stone-900">
            Kontakt
          </NuxtLink>

          <button
            type="button"
            class="text-sm text-stone-700 transition hover:text-stone-900"
            @click="searchOpen = true"
          >
            Søg
          </button>

          <SiteHeaderCart />
        </div>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <SiteFooter />

    <SiteSearchModal :open="searchOpen" @close="searchOpen = false" />
  </div>
</template>
