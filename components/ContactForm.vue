<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  message: ''
})

const fieldErrors = reactive<Record<'name' | 'email' | 'message', string>>({
  name: '',
  email: '',
  message: ''
})

const status = reactive<{
  type: 'idle' | 'success' | 'error'
  title: string
  message: string
}>({
  type: 'idle',
  title: '',
  message: ''
})

const isSubmitting = ref(false)

function resetFieldErrors() {
  fieldErrors.name = ''
  fieldErrors.email = ''
  fieldErrors.message = ''
}

function validateForm() {
  resetFieldErrors()

  if (!form.name.trim()) fieldErrors.name = 'Skriv gerne dit navn.'
  if (!form.email.trim()) fieldErrors.email = 'Vi skal bruge en e-mailadresse.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) fieldErrors.email = 'E-mailadressen ser ikke rigtig ud.'

  if (!form.message.trim()) fieldErrors.message = 'Fortæl lidt om hvad du vil spørge om.'
  else if (form.message.trim().length < 10) fieldErrors.message = 'Skriv gerne lidt mere, mindst 10 tegn.'

  return !fieldErrors.name && !fieldErrors.email && !fieldErrors.message
}

async function submitForm() {
  if (!validateForm()) {
    status.type = 'error'
    status.title = 'Tjek formularen'
    status.message = 'Der mangler et par ting før vi kan sende din besked.'
    return
  }

  isSubmitting.value = true
  status.type = 'idle'

  try {
    const response = await $fetch<{ message: string }>('/api/contact/send', {
      method: 'POST',
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim()
      }
    })

    status.type = 'success'
    status.title = 'Tak, din besked er sendt'
    status.message = response.message

    form.name = ''
    form.email = ''
    form.message = ''
    resetFieldErrors()
  }
  catch (error: any) {
    const data = error?.data
    const issues = Array.isArray(data?.issues) ? data.issues : []

    resetFieldErrors()
    for (const issue of issues) {
      if (issue.field && issue.message && issue.field in fieldErrors) {
        fieldErrors[issue.field as keyof typeof fieldErrors] = issue.message
      }
    }

    status.type = 'error'
    status.title = 'Beskeden gik ikke igennem'
    status.message = data?.statusMessage || error?.statusMessage || 'Prøv igen om et øjeblik.'
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form class="card p-6 sm:p-8 lg:p-10" @submit.prevent="submitForm" novalidate>
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="editorial-kicker">Kontakt</p>
        <h2 class="mt-3 text-4xl leading-none text-stone-900 sm:text-5xl">Skriv til Urupgaard</h2>
      </div>
      <p class="max-w-sm text-sm leading-7 text-stone-500">
        Brug formularen til spørgsmål om produkter, levering, specialbestillinger eller kommende drops.
      </p>
    </div>

    <div class="mt-8 grid gap-5">
      <label class="grid gap-2 text-sm font-medium text-stone-700">
        Navn
        <input
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          class="contact-input"
          :class="{ 'contact-input-error': fieldErrors.name }"
          placeholder="Dit navn"
        />
        <span v-if="fieldErrors.name" class="text-sm text-rose-700">{{ fieldErrors.name }}</span>
      </label>

      <label class="grid gap-2 text-sm font-medium text-stone-700">
        E-mail
        <input
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          class="contact-input"
          :class="{ 'contact-input-error': fieldErrors.email }"
          placeholder="navn@email.dk"
        />
        <span v-if="fieldErrors.email" class="text-sm text-rose-700">{{ fieldErrors.email }}</span>
      </label>

      <label class="grid gap-2 text-sm font-medium text-stone-700">
        Besked
        <textarea
          v-model="form.message"
          name="message"
          rows="6"
          class="contact-input min-h-[180px] resize-y"
          :class="{ 'contact-input-error': fieldErrors.message }"
          placeholder="Hvordan kan vi hjælpe?"
        />
        <span v-if="fieldErrors.message" class="text-sm text-rose-700">{{ fieldErrors.message }}</span>
      </label>
    </div>

    <div class="mt-8 flex flex-col gap-4 border-t border-black/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-sm leading-7 text-stone-500">Vi svarer typisk inden for 1 til 2 hverdage.</p>
      <button type="submit" class="pill-button-primary disabled:cursor-not-allowed disabled:opacity-70" :disabled="isSubmitting">
        {{ isSubmitting ? 'Sender...' : 'Send besked' }}
      </button>
    </div>

    <div
      v-if="status.type !== 'idle'"
      class="mt-6 rounded-[24px] border px-5 py-4"
      :class="status.type === 'success'
        ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
        : 'border-rose-200 bg-rose-50 text-rose-900'"
    >
      <p class="text-sm font-semibold uppercase tracking-[0.2em]">{{ status.title }}</p>
      <p class="mt-2 text-sm leading-7">{{ status.message }}</p>
    </div>
  </form>
</template>

<style scoped>
.contact-input {
  @apply w-full rounded-[22px] border border-black/10 bg-white/80 px-4 py-3 text-base text-stone-900 outline-none transition duration-200;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55);
}

.contact-input:focus {
  border-color: rgba(168, 98, 69, 0.45);
  box-shadow: 0 0 0 4px rgba(168, 98, 69, 0.12);
}

.contact-input-error {
  border-color: rgba(190, 24, 93, 0.4);
}
</style>
