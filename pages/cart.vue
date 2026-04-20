<script setup lang="ts">
const { cart, loading, refreshCart, checkout } = useCart()

onMounted(() => {
  refreshCart()
})
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
                <p class="mt-2 text-sm text-stone-500">Antal: {{ line.quantity }}</p>
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
