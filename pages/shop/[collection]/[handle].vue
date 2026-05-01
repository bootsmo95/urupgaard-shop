<script setup lang="ts">
const route = useRoute()
const handle = computed(() => String(route.params.handle || 'produkt'))
const collection = computed(() => String(route.params.collection || 'collection'))

const { data } = await useFetch(() => `/api/products/${handle.value}`)
const { addToCart, loading } = useCart()
const selectedVariantId = ref<string | null>(null)
const addedMessage = ref('')
let addedTimer: ReturnType<typeof setTimeout> | undefined

const product = computed(() => data.value?.product)

watchEffect(() => {
  const firstVariant = product.value?.variants?.[0]
  selectedVariantId.value = firstVariant?.id ?? product.value?.variantId ?? null
})

const selectedVariant = computed(() => {
  return product.value?.variants?.find((variant: any) => variant.id === selectedVariantId.value) ?? product.value?.variants?.[0]
})

async function onAddToCart() {
  if (!selectedVariantId.value || !product.value) return

  await addToCart({
    merchandiseId: selectedVariantId.value,
    quantity: 1,
    title: product.value.title,
    price: selectedVariant.value?.price || product.value.price,
    image: product.value.image
  })

  addedMessage.value = `${product.value.title} er lagt i kurven`

  if (addedTimer) clearTimeout(addedTimer)
  addedTimer = setTimeout(() => {
    addedMessage.value = ''
  }, 3500)
}

onBeforeUnmount(() => {
  if (addedTimer) clearTimeout(addedTimer)
})
</script>

<template>
  <div v-if="product" style="background: var(--urup-pageBg, #f6f3ee); color: var(--urup-text, #1c1a17); min-height: 100vh">
    <!-- Product detail (produkt.html style) -->
    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 60px 54px 100px">
      <div style="max-width: 1440px; margin: 0 auto">
        <!-- Breadcrumb -->
        <div style="display: flex; gap: 8px; font-family: var(--urup-body, Inter, system-ui); font-size: 13px; color: var(--urup-textMuted, #857c70); margin-bottom: 40px">
          <NuxtLink to="/" style="color: inherit; text-decoration: none">Forside</NuxtLink>
          <span style="opacity: 0.5">/</span>
          <NuxtLink to="/shop" style="color: inherit; text-decoration: none">Butik</NuxtLink>
          <span style="opacity: 0.5">/</span>
          <NuxtLink :to="`/shop/${collection}`" style="color: inherit; text-decoration: none">{{ collection }}</NuxtLink>
          <span style="opacity: 0.5">/</span>
          <span style="color: var(--urup-text, #1c1a17)">{{ product.title }}</span>
        </div>

        <div class="urup-product-detail urup-split-2" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: start">
          <!-- Gallery -->
          <ProductGallery :images="product.images" :title="product.title" />

          <!-- Panel -->
          <div class="urup-product-panel" style="position: sticky; top: 100px">
            <div style="display: flex; gap: 8px; margin-bottom: 20px">
              <span style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 999px; border: 1px solid rgba(28,26,23,0.12); font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase">
                {{ collection }}
              </span>
            </div>

            <h1 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-style: italic; font-size: clamp(36px, 4vw, 56px); line-height: 1.05; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0">
              {{ product.title }}
            </h1>

            <div style="margin-top: 24px; display: flex; align-items: baseline; gap: 16px">
              <span style="font-family: var(--urup-body, Inter, system-ui); font-size: 28px; color: var(--urup-text, #1c1a17)">{{ selectedVariant?.price || product.price }}</span>
              <span style="font-family: var(--urup-body, Inter, system-ui); font-size: 13px; color: #3a342c">● På lager</span>
            </div>

            <div style="margin-top: 36px; padding: 24px 28px; background: #ffffff; border-left: 2px solid #3a342c">
              <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 12px">Note fra Linda</div>
              <p style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-weight: 400; font-size: 19px; line-height: 1.55; color: var(--urup-text, #1c1a17); margin: 0">
                "{{ product.description || 'Håndlavet keramik, drejet og brændt i Urup.' }}"
              </p>
              <div style="margin-top: 14px; font-family: var(--urup-body, Inter, system-ui); font-size: 13px; color: var(--urup-textMuted, #857c70)">— Linda Sørensen, keramiker</div>
            </div>

            <div v-if="product.variants?.length > 1" style="margin-top: 28px">
              <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 12px">Variant</div>
              <select
                v-model="selectedVariantId"
                style="width: 100%; height: 48px; padding: 0 16px; border-radius: 999px; border: 1px solid rgba(28,26,23,0.12); background: transparent; color: var(--urup-text, #1c1a17); font-family: var(--urup-body, Inter, system-ui); font-size: 13px"
              >
                <option v-for="variant in product.variants" :key="variant.id" :value="variant.id">
                  {{ variant.title }} - {{ variant.price }}
                </option>
              </select>
            </div>

            <div style="margin-top: 32px; display: flex; gap: 12px; align-items: stretch">
              <button
                :disabled="loading || !selectedVariantId"
                @click="onAddToCart"
                style="flex: 1; height: 56px; padding: 0 28px; border-radius: 999px; border: none; background: var(--urup-text, #1c1a17); color: var(--urup-pageBg, #f6f3ee); font-family: var(--urup-body, Inter, system-ui); font-size: 15px; font-weight: 500; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 12px; white-space: nowrap"
              >
                {{ loading ? 'Tilføjer...' : 'Læg i kurv →' }}
              </button>
              <NuxtLink
                to="/cart"
                style="height: 56px; padding: 0 28px; border-radius: 999px; border: 1px solid var(--urup-text, #1c1a17); background: transparent; color: var(--urup-text, #1c1a17); font-family: var(--urup-body, Inter, system-ui); font-size: 15px; font-weight: 500; text-decoration: none; display: inline-flex; align-items: center; justify-content: center"
              >
                Gå til kurv
              </NuxtLink>
            </div>

            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-y-2 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-2 opacity-0"
            >
              <div v-if="addedMessage" style="margin-top: 14px; border-radius: 16px; border: 1px solid rgba(16,185,129,0.25); background: rgba(16,185,129,0.08); padding: 12px 14px; font-family: var(--urup-body, Inter, system-ui); font-size: 13px; color: #065f46">
                {{ addedMessage }}
              </div>
            </Transition>

            <div style="margin-top: 40px; padding-top: 32px; border-top: 1px solid rgba(28,26,23,0.12); display: flex; flex-direction: column; gap: 16px">
              <details style="border-bottom: 1px solid rgba(28,26,23,0.12); padding-bottom: 16px">
                <summary style="cursor: pointer; font-family: var(--urup-body, Inter, system-ui); font-size: 15px; color: var(--urup-text, #1c1a17); list-style: none; display: flex; justify-content: space-between">
                  <span>Pleje</span><span style="color: var(--urup-textMuted, #857c70)">+</span>
                </summary>
                <p style="margin-top: 12px; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: var(--urup-textMuted, #857c70); line-height: 1.6">
                  Tåler opvaskemaskine og mikroovn. Undgå brat temperaturskift.
                </p>
              </details>
              <details style="border-bottom: 1px solid rgba(28,26,23,0.12); padding-bottom: 16px">
                <summary style="cursor: pointer; font-family: var(--urup-body, Inter, system-ui); font-size: 15px; color: var(--urup-text, #1c1a17); list-style: none; display: flex; justify-content: space-between">
                  <span>Levering</span><span style="color: var(--urup-textMuted, #857c70)">+</span>
                </summary>
                <p style="margin-top: 12px; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: var(--urup-textMuted, #857c70); line-height: 1.6">
                  Pakkes i papir. Sendes med GLS eller PostNord.
                </p>
              </details>
              <details style="border-bottom: 1px solid rgba(28,26,23,0.12); padding-bottom: 16px">
                <summary style="cursor: pointer; font-family: var(--urup-body, Inter, system-ui); font-size: 15px; color: var(--urup-text, #1c1a17); list-style: none; display: flex; justify-content: space-between">
                  <span>Returnering</span><span style="color: var(--urup-textMuted, #857c70)">+</span>
                </summary>
                <p style="margin-top: 12px; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: var(--urup-textMuted, #857c70); line-height: 1.6">
                  Du har 14 dages fortrydelsesret.
                </p>
              </details>
            </div>

            <!-- Ratings/reviews hidden for now -->
          </div>
        </div>
      </div>
    </section>

    <!-- Related products -->
    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 80px 54px 120px; border-top: 1px solid rgba(28,26,23,0.12)">
      <div style="max-width: 1440px; margin: 0 auto">
        <div class="urup-section-head" style="display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; margin-bottom: 56px">
          <div>
            <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 16px">Også fra værkstedet</div>
            <h2 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-size: clamp(28px, 3.2vw, 48px); line-height: 1; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0">Du vil måske også kunne lide</h2>
          </div>
          <NuxtLink to="/shop" style="font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: var(--urup-text, #1c1a17); text-decoration: none; border-bottom: 1px solid rgba(28,26,23,0.12); padding-bottom: 4px; white-space: nowrap">
            Hele butikken →
          </NuxtLink>
        </div>

        <RelatedProducts :current-handle="handle" :collection-handle="collection" :limit="4" />
      </div>
    </section>
  </div>
</template>
