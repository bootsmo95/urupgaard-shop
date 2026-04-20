<script setup lang="ts">
const { cart, refreshCart } = useCart()

onMounted(() => {
  refreshCart()
})
</script>

<template>
  <NuxtLink
    to="/cart"
    class="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-stone-700"
  >
    <span>Kurv</span>
    <span class="rounded-full bg-stone-900 px-2 py-0.5 text-xs text-white">{{ cart.totalQuantity }}</span>
  </NuxtLink>
</template>
