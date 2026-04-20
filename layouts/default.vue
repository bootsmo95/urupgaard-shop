<template>
  <div>
    <header class="sticky top-0 z-40 border-b border-black/5 bg-[#f7f3ed]/80 backdrop-blur-xl">
      <div class="container-shell flex items-center justify-between py-5">
        <div class="flex items-center gap-8">
          <NuxtLink to="/" class="flex flex-col leading-none text-stone-900">
            <span class="text-[11px] uppercase tracking-[0.42em] text-stone-500">Urupgaard</span>
            <span class="mt-1 text-3xl">Keramik & gårdbutik</span>
          </NuxtLink>

          <nav class="hidden gap-6 text-sm font-medium text-stone-700 lg:flex">
            <NuxtLink to="/collections/keramik">Shop</NuxtLink>
            <NuxtLink to="/drops">Drops</NuxtLink>
            <NuxtLink to="/about">Om os</NuxtLink>
          </nav>
        </div>

        <div class="flex items-center gap-3">
          <NuxtLink to="/collections/keramik" class="pill-button-secondary hidden md:inline-flex">Se kollektion</NuxtLink>
          <SiteHeaderCart />
        </div>
      </div>
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>
