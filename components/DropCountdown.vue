<script setup lang="ts">
const props = defineProps<{
  target: string
}>()

const now = ref(Date.now())
let interval: ReturnType<typeof setInterval> | undefined

const parts = computed(() => {
  const diff = new Date(props.target).getTime() - now.value
  const safe = Math.max(diff, 0)
  const days = Math.floor(safe / (1000 * 60 * 60 * 24))
  const hours = Math.floor((safe / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((safe / (1000 * 60)) % 60)
  const seconds = Math.floor((safe / 1000) % 60)

  return [
    { label: 'Dage', value: days },
    { label: 'Timer', value: hours },
    { label: 'Min', value: minutes },
    { label: 'Sek', value: seconds }
  ]
})

onMounted(() => {
  interval = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="grid grid-cols-4 gap-3">
    <div
      v-for="part in parts"
      :key="part.label"
      class="rounded-2xl border border-black/5 bg-white/80 px-4 py-3 text-center"
    >
      <div class="text-2xl font-semibold text-stone-900">{{ part.value }}</div>
      <div class="mt-1 text-xs uppercase tracking-[0.2em] text-stone-500">{{ part.label }}</div>
    </div>
  </div>
</template>
