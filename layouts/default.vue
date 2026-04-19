<template>
  <div>
    <header class="border-b border-black/5 bg-white/70 backdrop-blur-sm">
      <div class="container-shell flex items-center justify-between py-5">
        <NuxtLink to="/" class="text-2xl tracking-[0.2em] text-stone-800 uppercase">Urupgaard</NuxtLink>
        <nav class="hidden gap-6 text-sm text-stone-700 md:flex">
          <NuxtLink to="/collections/keramik">Keramik</NuxtLink>
          <NuxtLink to="/drops">Drops</NuxtLink>
          <NuxtLink to="/about">Gårdbutik</NuxtLink>
        </nav>
      </div>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
