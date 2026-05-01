<script setup lang="ts">
const searchOpen = ref(false)
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
          class="urup-header-nav"
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
          <button
            type="button"
            style="color: inherit; background: transparent; border: 0; padding: 0; cursor: pointer"
            @click="searchOpen = true"
          >
            Søg
          </button>

          <div
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
