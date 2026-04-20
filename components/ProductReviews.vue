<script setup lang="ts">
const props = defineProps<{
  productId: string
}>()

type ReviewItem = {
  name: string
  rating: number
  comment: string
  createdAt: string
}

type ReviewResponse = {
  reviewCount: number
  averageRating: number
  reviews: ReviewItem[]
}

const form = reactive({
  name: '',
  email: '',
  rating: 5,
  comment: ''
})

const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref('')

const { data, pending, refresh } = await useFetch<ReviewResponse>(() => `/api/reviews/${encodeURIComponent(props.productId)}`,
  {
    key: `reviews:${props.productId}`,
    default: () => ({ reviewCount: 0, averageRating: 0, reviews: [] })
  }
)

const stats = computed(() => ({
  reviewCount: data.value?.reviewCount ?? 0,
  averageRating: data.value?.averageRating ?? 0,
  reviews: data.value?.reviews ?? []
}))

const ratingLabels = ['1', '2', '3', '4', '5']

function formatDate(value: string) {
  return new Intl.DateTimeFormat('da-DK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(value))
}

async function submitReview() {
  isSubmitting.value = true
  submitError.value = ''
  submitSuccess.value = ''

  try {
    await $fetch('/api/reviews', {
      method: 'POST',
      body: {
        productId: props.productId,
        ...form
      }
    })

    form.name = ''
    form.email = ''
    form.rating = 5
    form.comment = ''
    submitSuccess.value = 'Tak, din anmeldelse er sendt ind.'
    await refresh()
  }
  catch (error: any) {
    submitError.value = error?.data?.statusMessage || error?.statusMessage || 'Noget gik galt. Prøv igen.'
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="mt-14 border-t border-black/8 pt-10">
    <div class="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div class="space-y-5">
        <div>
          <p class="editorial-kicker">Anmeldelser</p>
          <h2 class="mt-3 text-4xl text-stone-900">Hvad andre siger</h2>
          <p class="mt-3 max-w-md text-sm leading-7 text-stone-600">
            Del gerne din oplevelse med værkstedets keramik. Hver anmeldelse hjælper næste besøgende med at vælge.
          </p>
        </div>

        <div class="card p-6">
          <div class="flex items-end justify-between gap-4">
            <div>
              <p class="text-sm uppercase tracking-[0.24em] text-stone-500">Samlet vurdering</p>
              <p class="mt-3 text-5xl text-stone-900">{{ stats.averageRating || '0.0' }}</p>
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
          <article v-for="review in stats.reviews" :key="`${review.name}-${review.createdAt}`" class="soft-panel p-5">
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

          <div v-if="!pending && !stats.reviews.length" class="soft-panel p-5 text-sm leading-7 text-stone-600">
            Der er endnu ingen anmeldelser. Vær den første til at dele din oplevelse.
          </div>
        </div>
      </div>

      <div class="card p-6 sm:p-8">
        <div>
          <p class="editorial-kicker">Skriv en anmeldelse</p>
          <h3 class="mt-3 text-3xl text-stone-900">Fortæl om din oplevelse</h3>
        </div>

        <form class="mt-8 space-y-5" @submit.prevent="submitReview">
          <div class="grid gap-4 sm:grid-cols-2">
            <label class="block text-sm text-stone-700">
              <span class="mb-2 block font-medium">Navn</span>
              <input v-model="form.name" type="text" class="w-full rounded-2xl border border-black/8 bg-white/80 px-4 py-3 outline-none transition focus:border-[var(--accent)]" />
            </label>

            <label class="block text-sm text-stone-700">
              <span class="mb-2 block font-medium">E-mail</span>
              <input v-model="form.email" type="email" class="w-full rounded-2xl border border-black/8 bg-white/80 px-4 py-3 outline-none transition focus:border-[var(--accent)]" />
            </label>
          </div>

          <label class="block text-sm text-stone-700">
            <span class="mb-2 block font-medium">Vurdering</span>
            <select v-model="form.rating" class="w-full rounded-2xl border border-black/8 bg-white/80 px-4 py-3 outline-none transition focus:border-[var(--accent)]">
              <option v-for="label in ratingLabels" :key="label" :value="Number(label)">{{ label }} stjerner</option>
            </select>
          </label>

          <label class="block text-sm text-stone-700">
            <span class="mb-2 block font-medium">Kommentar</span>
            <textarea v-model="form.comment" rows="5" class="w-full rounded-[24px] border border-black/8 bg-white/80 px-4 py-3 outline-none transition focus:border-[var(--accent)]"></textarea>
          </label>

          <div v-if="submitError" class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {{ submitError }}
          </div>

          <div v-if="submitSuccess" class="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {{ submitSuccess }}
          </div>

          <button type="submit" class="pill-button-primary w-full" :disabled="isSubmitting">
            {{ isSubmitting ? 'Sender anmeldelse...' : 'Send anmeldelse' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
