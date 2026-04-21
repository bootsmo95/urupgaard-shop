<script setup lang="ts">
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

watch(() => props.open, (isOpen) => {
  if (!process.client) return
  if (isOpen) {
    window.addEventListener('keydown', onKeydown)
    document.documentElement.style.overflow = 'hidden'
  } else {
    window.removeEventListener('keydown', onKeydown)
    document.documentElement.style.overflow = ''
  }
}, { immediate: true })

onBeforeUnmount(() => {
  if (!process.client) return
  window.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50">
      <button
        class="absolute inset-0 bg-black/40 backdrop-blur-sm"
        type="button"
        aria-label="Luk søgning"
        @click="emit('close')"
      />

      <div class="relative mx-auto flex h-full w-full max-w-5xl flex-col px-6 py-10">
        <div class="mb-6 flex items-center justify-between">
          <p class="editorial-kicker text-white/80">Søg</p>
          <button
            type="button"
            class="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-white/15"
            @click="emit('close')"
          >
            Luk
          </button>
        </div>

        <div class="card flex-1 overflow-auto p-6 sm:p-8">
          <ProductSearch />
        </div>
      </div>
    </div>
  </Teleport>
</template>

