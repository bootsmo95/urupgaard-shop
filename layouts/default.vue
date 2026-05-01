<script setup lang="ts">
const searchOpen = ref(false)
const mobileMenuOpen = ref(false)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header
      style="
        position: sticky;
        top: 0;
        z-index: 50;
        background: rgba(246, 243, 238, 0.85);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(28, 26, 23, 0.12);
      "
    >
      <div
        class="urup-header-grid"
        style="
          max-width: 1440px;
          margin: 0 auto;
          padding: 20px 54px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 40px;
        "
      >
        <NuxtLink to="/" style="text-decoration: none; justify-self: start">
          <div style="display: flex; align-items: baseline; gap: 10px; color: var(--urup-text, #1c1a17)">
            <span
              class="urup-script"
              style="
                font-family: 'Allison', 'Mrs Saint Delafield', cursive;
                font-size: 46px;
                font-weight: 400;
                line-height: 0.9;
                letter-spacing: 0.005em;
              "
            >
              urupgaard
            </span>
          </div>
        </NuxtLink>

        <nav
          class="urup-header-nav urup-desktop-only"
          style="
            display: flex;
            gap: 28px;
            font-family: var(--urup-body, Inter, system-ui);
            font-size: 14px;
            color: var(--urup-text, #1c1a17);
          "
        >
          <NuxtLink to="/shop" style="color: inherit; text-decoration: none; letter-spacing: 0.01em; border-bottom: 1px solid transparent; padding-bottom: 2px">Butik</NuxtLink>
          <NuxtLink to="/drops" style="color: inherit; text-decoration: none; letter-spacing: 0.01em; border-bottom: 1px solid transparent; padding-bottom: 2px">Drops</NuxtLink>
          <NuxtLink to="/besoeg" style="color: inherit; text-decoration: none; letter-spacing: 0.01em; border-bottom: 1px solid transparent; padding-bottom: 2px">Besøg</NuxtLink>
          <NuxtLink to="/about" style="color: inherit; text-decoration: none; letter-spacing: 0.01em; border-bottom: 1px solid transparent; padding-bottom: 2px">Om</NuxtLink>
        </nav>

        <div
          class="urup-header-actions"
          style="
            display: flex;
            gap: 14px;
            justify-content: flex-end;
            align-items: center;
            font-family: var(--urup-body, Inter, system-ui);
            font-size: 14px;
          "
        >
          <!-- Desktop actions -->
          <button
            type="button"
            class="urup-desktop-only"
            style="color: inherit; background: transparent; border: 0; padding: 0; cursor: pointer"
            @click="searchOpen = true"
          >
            Søg
          </button>

          <div
            class="urup-desktop-only"
            style="
              display: inline-flex;
              align-items: center;
              gap: 8px;
              border: 1px solid var(--urup-text, #1c1a17);
              padding: 8px 14px;
              border-radius: 999px;
            "
          >
            <SiteHeaderCart />
          </div>

          <!-- Mobile actions: burger + search icon + cart icon -->
          <button
            type="button"
            class="urup-mobile-only"
            aria-label="Menu"
            style="width: 40px; height: 40px; border-radius: 999px; border: 1px solid rgba(28,26,23,0.18); background: transparent; cursor: pointer; display: inline-flex; align-items: center; justify-content: center"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            ☰
          </button>

          <button
            type="button"
            class="urup-mobile-only"
            aria-label="Søg"
            style="width: 40px; height: 40px; border-radius: 999px; border: 1px solid rgba(28,26,23,0.18); background: transparent; cursor: pointer; display: inline-flex; align-items: center; justify-content: center"
            @click="searchOpen = true"
          >
            ⌕
          </button>

          <NuxtLink
            to="/cart"
            class="urup-mobile-only"
            aria-label="Kurv"
            style="width: 40px; height: 40px; border-radius: 999px; border: 1px solid rgba(28,26,23,0.18); color: inherit; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; position: relative"
          >
            <span aria-hidden="true" style="font-size: 16px; line-height: 1">🛍</span>
            <span
              class="urup-cart-badge"
              style="position: absolute; top: -6px; right: -6px; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 999px; background: var(--urup-text, #1c1a17); color: var(--urup-pageBg, #f6f3ee); font-family: var(--urup-body, Inter, system-ui); font-size: 11px; display: inline-flex; align-items: center; justify-content: center"
            >
              <ClientOnly>
                <CartCount />
              </ClientOnly>
            </span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Mobile menu (fullscreen, slide in from right) -->
    <Teleport to="body">
      <div v-if="mobileMenuOpen" class="urup-mobile-only" style="position: fixed; inset: 0; z-index: 60">
        <button
          type="button"
          aria-label="Luk menu"
          style="position: absolute; inset: 0; background: rgba(0,0,0,0.28)"
          @click="mobileMenuOpen = false"
        />

        <div
          class="urup-mobile-drawer"
          style="
            position: absolute;
            top: 0;
            right: 0;
            height: 100vh;
            width: 100vw;
            background: rgba(246,243,238,0.98);
            backdrop-filter: blur(14px);
            transform: translateX(0);
          "
        >
          <div style="padding: 24px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(28,26,23,0.12)">
            <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70)">Menu</div>
            <button
              type="button"
              style="height: 40px; padding: 0 16px; border-radius: 999px; border: 1px solid rgba(28,26,23,0.18); background: transparent; color: var(--urup-text, #1c1a17); font-family: var(--urup-body, Inter, system-ui); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer"
              @click="mobileMenuOpen = false"
            >
              Luk
            </button>
          </div>

          <nav style="padding: 28px 20px; display: grid; gap: 18px; font-family: var(--urup-body, Inter, system-ui)">
            <NuxtLink to="/shop" style="text-decoration: none; color: inherit; font-size: 22px" @click="mobileMenuOpen = false">Butik</NuxtLink>
            <NuxtLink to="/drops" style="text-decoration: none; color: inherit; font-size: 22px" @click="mobileMenuOpen = false">Drops</NuxtLink>
            <NuxtLink to="/besoeg" style="text-decoration: none; color: inherit; font-size: 22px" @click="mobileMenuOpen = false">Besøg</NuxtLink>
            <NuxtLink to="/about" style="text-decoration: none; color: inherit; font-size: 22px" @click="mobileMenuOpen = false">Om</NuxtLink>
            <NuxtLink to="/contact" style="text-decoration: none; color: inherit; font-size: 22px" @click="mobileMenuOpen = false">Kontakt</NuxtLink>
          </nav>
        </div>
      </div>
    </Teleport>

    <main class="flex-1">
      <slot />
    </main>

    <SiteFooter />

    <SiteSearchModal :open="searchOpen" @close="searchOpen = false" />
  </div>
</template>

<style scoped>
@media (min-width: 641px) {
  .urup-mobile-only {
    display: none !important;
  }
}

@media (max-width: 640px) {
  .urup-desktop-only {
    display: none !important;
  }

  .urup-mobile-drawer {
    animation: urupDrawerIn 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }
}

@keyframes urupDrawerIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
