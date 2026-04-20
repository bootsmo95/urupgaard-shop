<script setup lang="ts">
const email = ref('')
const status = ref<'idle' | 'success' | 'error'>('idle')
const message = ref('')
const loading = ref(false)

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function handleSubmit() {
  status.value = 'idle'
  message.value = ''

  const normalizedEmail = email.value.trim().toLowerCase()

  if (!emailPattern.test(normalizedEmail)) {
    status.value = 'error'
    message.value = 'Skriv en gyldig e-mailadresse.'
    return
  }

  loading.value = true

  try {
    const response = await $fetch<{ message: string }>('/api/newsletter', {
      method: 'POST',
      body: { email: normalizedEmail }
    })

    status.value = 'success'
    message.value = response.message
    email.value = ''
  } catch (error: any) {
    status.value = 'error'
    message.value = error?.data?.statusMessage || 'Noget gik galt. Prøv igen om lidt.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="soft-panel p-6 sm:p-7">
    <p class="editorial-kicker">Nyhedsbrev</p>
    <h4 class="mt-3 text-3xl leading-none text-stone-900">Få besked om nye drops</h4>
    <p class="mt-3 text-sm leading-7 text-stone-600">
      Tilmeld dig og få rolige opdateringer om nye kollektioner, små serier og kommende lanceringer.
    </p>

    <form class="mt-6 space-y-3" @submit.prevent="handleSubmit">
      <label class="sr-only" for="newsletter-email">E-mailadresse</label>
      <div class="flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          v-model="email"
          type="email"
          name="email"
          autocomplete="email"
          placeholder="din@email.dk"
          class="min-h-[48px] flex-1 rounded-full border border-black/10 bg-white/80 px-5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-400"
          :disabled="loading"
        >
        <button
          type="submit"
          class="pill-button-primary min-h-[48px] whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="loading"
        >
          {{ loading ? 'Gemmer...' : 'Tilmeld' }}
        </button>
      </div>
    </form>

    <p
      v-if="message"
      class="mt-3 text-sm"
      :class="status === 'success' ? 'text-emerald-700' : 'text-rose-700'"
    >
      {{ message }}
    </p>
  </div>
</template>
