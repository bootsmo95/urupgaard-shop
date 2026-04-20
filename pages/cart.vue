<script setup lang="ts">
const { cart, loading, refreshCart, checkout, updateLine, removeLine } = useCart()

onMounted(() => {
  refreshCart()
})

async function increment(lineId: string, quantity: number) {
  await updateLine(lineId, quantity + 1)
}

async function decrement(lineId: string, quantity: number) {
  if (quantity <= 1) {
    await removeLine(lineId)
    return
  }

  await updateLine(lineId, quantity - 1)
}
</script>

<template>
  <div class="container-shell py-10">
    <div class="grid gap-8 lg:grid-cols-[1fr_0.42fr]">
      <section class="card p-8 lg:p-10">
        <p class="text-sm uppercase tracking-[0.35em] text-stone-500">Kurv</p>
        <h1 class="mt-4 text-5xl text-stone-900">Dine varer</h1>

        <div v-if="cart.lines.length" class="mt-8 space-y-4">
          <article
            v-for="line in cart.lines"
            :key="line.id"
            class="flex gap-4 rounded-[24px] border border-black/5 bg-stone-50/70 p-4"
          >
            <img v-if="line.image" :src="line.image" :alt="line.title" class="h-24 w-24 rounded-2xl object-cover" />
            <div class="flex flex-1 items-center justify-between gap-4">
              <div>
                <h2 class="text-xl text-stone-900">{{ line.title }}</h2>
                <div class="mt-3 flex items-center gap-3">
                  <button class="rounded-full border border-stone-300 px-3 py-1 text-sm" :disabled="loading" @click="decrement(line.id, line.quantity)">-</button>
                  <span class="min-w-6 text-center text-sm text-stone-700">{{ line.quantity }}</span>
                  <button class="rounded-full border border-stone-300 px-3 py-1 text-sm" :disabled="loading" @click="increment(line.id, line.quantity)">+</button>
                  <button class="ml-3 text-sm text-stone-500 underline underline-offset-4" :disabled="loading" @click="removeLine(line.id)">Fjern</button>
                </div>
              </div>
              <p class="text-lg text-stone-900">{{ line.price }}</p>
            </div>
          </article>
        </div>

        <div v-else class="mt-8 rounded-[24px] bg-stone-50 p-6 text-stone-600">
          Kurven er tom lige nu.
        </div>
      </section>

      <aside class="card p-8">
        <p class="text-sm uppercase tracking-[0.35em] text-stone-500">Oversigt</p>
        <div class="mt-6 space-y-4 text-stone-700">
          <div class="flex items-center justify-between">
            <span>Antal varer</span>
            <span>{{ cart.totalQuantity }}</span>
          </div>
          <div class="flex items-center justify-between text-xl text-stone-900">
            <span>Total</span>
            <span>{{ cart.totalAmount }}</span>
          </div>
        </div>

        <button
          class="mt-8 w-full rounded-full bg-stone-900 px-6 py-4 text-sm text-white disabled:opacity-50"
          :disabled="loading || !cart.lines.length"
          @click="checkout"
        >
          {{ loading ? 'Forbereder...' : 'Gå til checkout' }}
        </button>

        <p class="mt-4 text-sm leading-6 text-stone-500">
          Checkout bliver sendt videre til Shopify, så betaling, moms og ordreflow forbliver simpelt.
        </p>
      </aside>
    </div>
  </div>
</template>
