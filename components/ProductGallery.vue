<script setup lang="ts">
interface GalleryImage {
  url: string
  alt?: string | null
}

const props = withDefaults(defineProps<{
  images?: Array<string | GalleryImage>
  title?: string
}>(), {
  images: () => [],
  title: 'Produktbillede'
})

const normalizedImages = computed(() => {
  return (props.images ?? [])
    .map((image) => {
      if (typeof image === 'string') {
        return {
          url: image,
          alt: props.title
        }
      }

      return {
        url: image?.url,
        alt: image?.alt || props.title
      }
    })
    .filter((image): image is { url: string; alt: string } => Boolean(image.url))
})

const activeIndex = ref(0)
const lightboxOpen = ref(false)
const touchStartX = ref<number | null>(null)
const touchDeltaX = ref(0)

watch(normalizedImages, (images) => {
  if (!images.length) {
    activeIndex.value = 0
    lightboxOpen.value = false
    return
  }

  if (activeIndex.value > images.length - 1) {
    activeIndex.value = 0
  }
}, { immediate: true })

const activeImage = computed(() => normalizedImages.value[activeIndex.value])
const hasMultipleImages = computed(() => normalizedImages.value.length > 1)

function setActive(index: number) {
  if (!normalizedImages.value.length) return
  activeIndex.value = ((index % normalizedImages.value.length) + normalizedImages.value.length) % normalizedImages.value.length
}

function showPrevious() {
  setActive(activeIndex.value - 1)
}

function showNext() {
  setActive(activeIndex.value + 1)
}

function openLightbox(index = activeIndex.value) {
  setActive(index)
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (!normalizedImages.value.length) return

  if (lightboxOpen.value) {
    if (event.key === 'Escape') {
      closeLightbox()
      return
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      showPrevious()
      return
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      showNext()
    }

    return
  }

  if (!hasMultipleImages.value) return

  if (event.key === 'ArrowLeft') {
    showPrevious()
  }

  if (event.key === 'ArrowRight') {
    showNext()
  }
}

function onTouchStart(event: TouchEvent) {
  touchStartX.value = event.touches[0]?.clientX ?? null
  touchDeltaX.value = 0
}

function onTouchMove(event: TouchEvent) {
  if (touchStartX.value === null) return
  touchDeltaX.value = (event.touches[0]?.clientX ?? touchStartX.value) - touchStartX.value
}

function onTouchEnd() {
  if (touchStartX.value === null || !hasMultipleImages.value) {
    touchStartX.value = null
    touchDeltaX.value = 0
    return
  }

  if (Math.abs(touchDeltaX.value) > 40) {
    if (touchDeltaX.value > 0) {
      showPrevious()
    } else {
      showNext()
    }
  }

  touchStartX.value = null
  touchDeltaX.value = 0
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div v-if="activeImage" class="flex flex-col gap-4">
    <div
      class="card group relative overflow-hidden"
      @touchstart.passive="onTouchStart"
      @touchmove.passive="onTouchMove"
      @touchend="onTouchEnd"
    >
      <button
        type="button"
        class="image-shell aspect-[4/5] w-full overflow-hidden bg-stone-100 text-left"
        :aria-label="`Åbn billede ${activeIndex + 1} i stor visning`"
        @click="openLightbox()"
      >
        <img :src="activeImage.url" :alt="activeImage.alt" class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
      </button>

      <div v-if="hasMultipleImages" class="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-4">
        <button
          type="button"
          class="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/85 text-stone-900 shadow-sm backdrop-blur transition hover:bg-white"
          aria-label="Forrige billede"
          @click="showPrevious"
        >
          ←
        </button>
        <button
          type="button"
          class="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/85 text-stone-900 shadow-sm backdrop-blur transition hover:bg-white"
          aria-label="Næste billede"
          @click="showNext"
        >
          →
        </button>
      </div>

      <div v-if="hasMultipleImages" class="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/70 bg-white/75 px-3 py-1.5 text-xs tracking-[0.2em] text-stone-700 backdrop-blur">
        <span>{{ activeIndex + 1 }}</span>
        <span class="opacity-40">/</span>
        <span>{{ normalizedImages.length }}</span>
      </div>
    </div>

    <div v-if="hasMultipleImages" class="grid grid-cols-4 gap-3 sm:grid-cols-5">
      <button
        v-for="(image, index) in normalizedImages"
        :key="`${image.url}-${index}`"
        type="button"
        class="soft-panel overflow-hidden rounded-2xl border transition focus:outline-none focus:ring-2 focus:ring-stone-400"
        :class="index === activeIndex ? 'border-stone-900 shadow-sm' : 'border-transparent hover:border-stone-300'"
        :aria-label="`Vis billede ${index + 1}`"
        :aria-pressed="index === activeIndex"
        @click="setActive(index)"
      >
        <div class="aspect-square overflow-hidden bg-stone-100">
          <img :src="image.url" :alt="image.alt" class="h-full w-full object-cover" />
        </div>
      </button>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="lightboxOpen" class="fixed inset-0 z-[90] bg-stone-950/92 p-4 sm:p-6" @click.self="closeLightbox">
          <button
            type="button"
            class="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Luk stor visning"
            @click="closeLightbox"
          >
            ✕
          </button>

          <div class="flex h-full flex-col items-center justify-center gap-4">
            <div
              class="relative flex w-full max-w-5xl flex-1 items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
              @touchstart.passive="onTouchStart"
              @touchmove.passive="onTouchMove"
              @touchend="onTouchEnd"
            >
              <img :src="activeImage.url" :alt="activeImage.alt" class="max-h-full max-w-full object-contain" />

              <template v-if="hasMultipleImages">
                <button
                  type="button"
                  class="absolute left-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white backdrop-blur transition hover:bg-black/40"
                  aria-label="Forrige billede"
                  @click="showPrevious"
                >
                  ←
                </button>
                <button
                  type="button"
                  class="absolute right-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white backdrop-blur transition hover:bg-black/40"
                  aria-label="Næste billede"
                  @click="showNext"
                >
                  →
                </button>
              </template>
            </div>

            <div v-if="hasMultipleImages" class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/75">
              <span>{{ activeIndex + 1 }}</span>
              <span class="opacity-40">/</span>
              <span>{{ normalizedImages.length }}</span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
