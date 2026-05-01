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
    <div v-if="open" class="fixed inset-0 z-50" style="background: rgba(246,243,238,0.96); backdrop-filter: blur(14px)">
      <button
        class="absolute inset-0"
        type="button"
        aria-label="Luk søgning"
        @click="emit('close')"
      />

      <div style="position: relative; max-width: 1440px; margin: 0 auto; padding: 28px 54px 60px; height: 100%; overflow: auto; z-index: 1">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-bottom: 18px; border-bottom: 1px solid rgba(28,26,23,0.12)">
          <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70)">Søg</div>
          <button
            type="button"
            style="height: 40px; padding: 0 16px; border-radius: 999px; border: 1px solid rgba(28,26,23,0.18); background: transparent; color: var(--urup-text, #1c1a17); font-family: var(--urup-body, Inter, system-ui); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer"
            @click="emit('close')"
          >
            Luk
          </button>
        </div>

        <div style="padding-top: 28px">
          <ProductSearch />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Ensure modal always sits above sticky header + mobile drawer */
.z-50 {
  z-index: 70;
}

@media (max-width: 640px) {
  /* Match page padding on mobile */
  div[style*="padding: 28px 54px 60px"] {
    padding: 18px 20px 32px !important;
  }
}
</style>
