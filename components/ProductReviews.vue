<script setup lang="ts">
const props = defineProps<{
  handle: string
}>()

type ReviewItem = {
  id: string
  handle: string
  name: string
  rating: number
  comment: string
  createdAt: string
}

type ReviewResponse = {
  handle: string
  reviewCount: number
  averageRating: number
  reviews: ReviewItem[]
}

const form = reactive({
  name: '',
  email: '',
  rating: 5,
  comment: '',
  company: ''
})

const fieldErrors = reactive<Record<'name' | 'email' | 'rating' | 'comment', string>>({
  name: '',
  email: '',
  rating: '',
  comment: ''
})

const status = reactive<{
  type: 'idle' | 'success' | 'error'
  message: string
}>({
  type: 'idle',
  message: ''
})

const isSubmitting = ref(false)

const { data, pending, refresh } = await useFetch<ReviewResponse>(() => `/api/reviews?handle=${encodeURIComponent(props.handle)}`,
  {
    key: `reviews:${props.handle}`,
    watch: [() => props.handle],
    default: () => ({ handle: props.handle, reviewCount: 0, averageRating: 0, reviews: [] })
  }
)

const stats = computed(() => ({
  reviewCount: data.value?.reviewCount ?? 0,
  averageRating: data.value?.averageRating ?? 0,
  reviews: data.value?.reviews ?? []
}))

function resetFieldErrors() {
  fieldErrors.name = ''
  fieldErrors.email = ''
  fieldErrors.rating = ''
  fieldErrors.comment = ''
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('da-DK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(value))
}

async function submitReview() {
  isSubmitting.value = true
  status.type = 'idle'
  status.message = ''
  resetFieldErrors()

  try {
    await $fetch<ReviewResponse>('/api/reviews', {
      method: 'POST',
      body: {
        handle: props.handle,
        name: form.name,
        email: form.email,
        rating: form.rating,
        comment: form.comment,
        company: form.company
      }
    })

    form.name = ''
    form.email = ''
    form.rating = 5
    form.comment = ''
    form.company = ''
    status.type = 'success'
    status.message = 'Tak, din anmeldelse er sendt ind.'
    await refresh()
  }
  catch (error: any) {
    const issues = Array.isArray(error?.data?.issues) ? error.data.issues : []

    for (const issue of issues) {
      if (issue.field in fieldErrors) {
        fieldErrors[issue.field as keyof typeof fieldErrors] = issue.message
      }
    }

    status.type = 'error'
    status.message = error?.data?.statusMessage || error?.statusMessage || 'Noget gik galt. Prøv igen.'
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="mt-14 border-t border-black/8 pt-10">
    <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div class="space-y-5">
        <div>
          <p class="editorial-kicker">Anmeldelser</p>
          <h2 class="mt-3 text-4xl text-stone-900">Hvad andre siger</h2>
          <p class="mt-3 max-w-md text-sm leading-7 text-stone-600">
            Rolige ord fra andre købere, samlet som en lille gæstebog for værkstedets keramik.
          </p>
        </div>

        <div class="rounded-[28px] border border-stone-200/80 bg-stone-50/80 p-6 shadow-[0_18px_45px_rgba(120,113,108,0.12)] backdrop-blur-sm">
          <div class="flex items-end justify-between gap-4">
            <div>
              <p class="text-xs uppercase tracking-[0.28em] text-stone-500">Samlet vurdering</p>
              <p class="mt-3 text-5xl text-stone-900">{{ stats.averageRating.toFixed(1) }}</p>
            </div>
            <div class="text-right">
              <div class="flex justify-end gap-1 text-lg text-[var(--accent)]">
                <span v-for="star in 5" :key="star">{{ star <= Math.round(stats.averageRating) ? '★' : '☆' }}</span>
              </div>
              <p class="mt-2 text-sm text-stone-500">{{ stats.reviewCount }} anmeldelser</p>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <article v-for="review in stats.reviews" :key="review.id" class="rounded-[26px] border border-stone-200/75 bg-white/85 p-5 shadow-[0_10px_30px_rgba(120,113,108,0.08)]">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p class="text-base font-semibold text-stone-900">{{ review.name }}</p>
                <p class="mt-1 text-xs uppercase tracking-[0.24em] text-stone-400">{{ formatDate(review.createdAt) }}</p>
              </div>
              <div class="flex gap-1 text-base text-[var(--accent)]">
                <span v-for="star in 5" :key="star">{{ star <= review.rating ? '★' : '☆' }}</span>
              </div>
            </div>
            <p class="mt-4 text-sm leading-7 text-stone-700">{{ review.comment }}</p>
          </article>

          <div v-if="!pending && !stats.reviews.length" class="rounded-[26px] border border-dashed border-stone-300 bg-stone-50/70 p-5 text-sm leading-7 text-stone-600">
            Der er endnu ingen anmeldelser. Vær den første til at dele din oplevelse.
          </div>
        </div>
      </div>

      <form class="rounded-[30px] border border-stone-200/80 bg-white/80 p-6 shadow-[0_24px_60px_rgba(120,113,108,0.12)] backdrop-blur sm:p-8" @submit.prevent="submitReview" novalidate>
        <div>
          <p class="editorial-kicker">Skriv en anmeldelse</p>
          <h3 class="mt-3 text-3xl text-stone-900">Fortæl om din oplevelse</h3>
          <p class="mt-3 text-sm leading-7 text-stone-500">En kort note om form, brug eller hverdagsglæde hjælper næste besøgende godt på vej.</p>
        </div>

        <div class="mt-8 space-y-5">
          <div class="grid gap-4 sm:grid-cols-2">
            <label class="review-field">
              <span>Navn</span>
              <input v-model="form.name" type="text" name="name" autocomplete="name" class="review-input" :class="{ 'review-input-error': fieldErrors.name }" placeholder="Dit navn" />
              <small v-if="fieldErrors.name" class="review-error">{{ fieldErrors.name }}</small>
            </label>

            <label class="review-field">
              <span>E-mail (valgfri)</span>
              <input v-model="form.email" type="email" name="email" autocomplete="email" class="review-input" :class="{ 'review-input-error': fieldErrors.email }" placeholder="navn@email.dk" />
              <small v-if="fieldErrors.email" class="review-error">{{ fieldErrors.email }}</small>
            </label>
          </div>

          <label class="review-field sr-only" aria-hidden="true">
            <span>Firma</span>
            <input v-model="form.company" type="text" name="company" tabindex="-1" autocomplete="off" class="review-input" />
          </label>

          <label class="review-field">
            <span>Vurdering</span>
            <select v-model="form.rating" class="review-input" :class="{ 'review-input-error': fieldErrors.rating }">
              <option v-for="stars in [5, 4, 3, 2, 1]" :key="stars" :value="stars">{{ stars }} {{ stars === 1 ? 'stjerne' : 'stjerner' }}</option>
            </select>
            <small v-if="fieldErrors.rating" class="review-error">{{ fieldErrors.rating }}</small>
          </label>

          <label class="review-field">
            <span>Kommentar</span>
            <textarea v-model="form.comment" rows="5" name="comment" class="review-input min-h-[160px] resize-y" :class="{ 'review-input-error': fieldErrors.comment }" placeholder="Hvordan føles produktet i brug?" />
            <small v-if="fieldErrors.comment" class="review-error">{{ fieldErrors.comment }}</small>
          </label>
        </div>

        <div v-if="status.type !== 'idle'" class="mt-6 rounded-[24px] border px-4 py-3 text-sm"
          :class="status.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-700'">
          {{ status.message }}
        </div>

        <div class="mt-8 flex flex-col gap-4 border-t border-stone-200/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-sm leading-7 text-stone-500">Alle anmeldelser bliver vist direkte, så hold tonen venlig og konkret.</p>
          <button type="submit" class="pill-button-primary disabled:cursor-not-allowed disabled:opacity-70" :disabled="isSubmitting">
            {{ isSubmitting ? 'Sender anmeldelse...' : 'Send anmeldelse' }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.review-field {
  @apply grid gap-2 text-sm font-medium text-stone-700;
}

.review-input {
  @apply w-full rounded-[22px] border border-stone-300/80 bg-stone-50/70 px-4 py-3 text-base text-stone-900 outline-none transition duration-200;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75);
}

.review-input:focus {
  border-color: rgba(168, 98, 69, 0.45);
  box-shadow: 0 0 0 4px rgba(168, 98, 69, 0.12);
}

.review-input-error {
  border-color: rgba(190, 24, 93, 0.35);
}

.review-error {
  @apply text-sm text-rose-700;
}
</style>
