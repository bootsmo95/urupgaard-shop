<script setup lang="ts">
const { cart, loading, removeFromCart, updateQuantity, refreshCart } = useCart()

onMounted(() => {
  refreshCart()
})

async function handleQuantityChange(lineId: string, newQuantity: number) {
  if (newQuantity <= 0) {
    await removeFromCart(lineId)
  } else {
    await updateQuantity(lineId, newQuantity)
  }
}
</script>

<template>
  <div class="container-shell py-8 lg:py-10">
    <div class="mb-10">
      <p class="editorial-kicker">Kurv</p>
      <h1 class="mt-3 text-6xl leading-none text-stone-900">Dine varer</h1>
    </div>

    <div v-if="cart.lines.length === 0" class="rounded-3xl border border-black/8 bg-stone-50/50 p-12 text-center">
      <p class="text-lg text-stone-600">Din kurv er tom</p>
      <NuxtLink to="/collections/keramik" class="pill-button-primary mt-6 inline-block">Fortsæt med at shoppe</NuxtLink>
    </div>

    <div v-else class="grid gap-10 lg:grid-cols-[1fr_380px]">
      <div class="space-y-4">
        <article v-for="line in cart.lines" :key="line.id" class="card overflow-hidden p-6 md:p-8">
          <div class="flex gap-6">
            <div class="w-24 flex-shrink-0">
              <div class="image-shell aspect-[4/5] overflow-hidden rounded-2xl">
                <img v-if="line.image" :src="line.image" :alt="line.title" class="h-full w-full object-cover" />
              </div>
            </div>

            <div class="flex-1">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-2xl text-stone-900">{{ line.title }}</h3>
                  <p class="mt-1 text-sm text-stone-500">{{ line.price }}</p>
                </div>
                <button
                  @click="removeFromCart(line.id)"
                  class="text-xs font-semibold uppercase tracking-[0.15em] text-stone-400 transition hover:text-stone-900"
                >
                  Fjern
                </button>
              </div>

              <div class="mt-6 flex items-center gap-3">
                <button
                  @click="handleQuantityChange(line.id, line.quantity - 1)"
                  :disabled="loading"
                  class="flex h-9 w-9 items-center justify-center rounded-full border border-black/8 text-stone-600 transition hover:bg-stone-100 disabled:opacity-50"
                >
                  −
                </button>
                <span class="w-8 text-center font-semibold text-stone-900">{{ line.quantity }}</span>
                <button
                  @click="handleQuantityChange(line.id, line.quantity + 1)"
                  :disabled="loading"
                  class="flex h-9 w-9 items-center justify-center rounded-full border border-black/8 text-stone-600 transition hover:bg-stone-100 disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="lg:sticky lg:top-20 lg:h-fit">
        <div class="card space-y-6 p-8">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Oversigt</p>
            <div class="mt-6 space-y-3 text-sm">
              <div class="flex items-center justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{{ cart.totalAmount }}</span>
              </div>
              <div class="flex items-center justify-between text-stone-600">
                <span>Levering</span>
                <span>Beregnes ved checkout</span>
              </div>
              <div class="flex items-center justify-between text-stone-600">
                <span>Moms</span>
                <span>Inkluderet</span>
              </div>
            </div>

            <div class="mt-6 border-t border-black/8 pt-6">
              <div class="flex items-center justify-between text-lg font-semibold text-stone-900">
                <span>I alt</span>
                <span>{{ cart.totalAmount }}</span>
              </div>
            </div>
          </div>

          <a
            :href="cart.checkoutUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="pill-button-primary block w-full text-center"
          >
            Til checkout
          </a>

          <NuxtLink to="/collections/keramik" class="pill-button-secondary block w-full text-center">
            Fortsæt shopping
          </NuxtLink>

          <p class="text-xs text-stone-500">
            Checkout håndteres af Shopify. Du bliver omdirigeret til sikker betaling.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
