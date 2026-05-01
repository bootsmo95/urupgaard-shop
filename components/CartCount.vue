<script setup lang="ts">
const { cart } = useCart()
</script>

<template>
  <span>{{ cart.totalQuantity }}</span>
</template>
