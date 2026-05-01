<script setup lang="ts">
const { cart, loading, removeLine, updateLine, refreshCart } = useCart()

onMounted(() => {
  refreshCart()
})

async function handleQuantityChange(lineId: string, newQuantity: number) {
  if (newQuantity <= 0) {
    await removeLine(lineId)
  } else {
    await updateLine(lineId, newQuantity)
  }
}
</script>

<template>
  <div style="background: var(--urup-pageBg, #f6f3ee); color: var(--urup-text, #1c1a17); min-height: 100vh">
    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 60px 54px 80px; border-bottom: 1px solid rgba(28,26,23,0.12)">
      <div style="max-width: 1440px; margin: 0 auto">
        <div style="display: flex; gap: 8px; font-family: var(--urup-body, Inter, system-ui); font-size: 13px; color: var(--urup-textMuted, #857c70); margin-bottom: 32px">
          <NuxtLink to="/" style="color: inherit; text-decoration: none">Forside</NuxtLink>
          <span style="opacity: 0.5">/</span>
          <span style="color: var(--urup-text, #1c1a17)">Kurv</span>
        </div>

        <div class="urup-page-head urup-split-2" style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 80px; align-items: end">
          <div>
            <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 24px">
              {{ cart.lines.length }} {{ cart.lines.length === 1 ? 'vare' : 'varer' }}
            </div>
            <h1 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-style: italic; font-size: clamp(44px, 6vw, 96px); line-height: 0.95; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0">
              Din kurv
            </h1>
          </div>
          <p style="font-family: var(--urup-body, Inter, system-ui); font-size: 18px; line-height: 1.55; color: var(--urup-textMuted, #857c70); margin: 0; padding-bottom: 8px; max-width: 420px">
            Checkout håndteres af Shopify. Du bliver omdirigeret til sikker betaling.
          </p>
        </div>
      </div>
    </section>

    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 64px 54px 120px">
      <div style="max-width: 1440px; margin: 0 auto">
        <div v-if="cart.lines.length === 0" style="padding: 80px 0; text-align: center; font-family: var(--urup-body, Inter, system-ui); color: var(--urup-textMuted, #857c70)">
          <div style="font-size: 22px; color: var(--urup-text, #1c1a17)">Din kurv er tom</div>
          <NuxtLink
            to="/shop"
            style="margin-top: 24px; height: 52px; padding: 0 28px; border-radius: 999px; background: var(--urup-text, #1c1a17); color: var(--urup-pageBg, #f6f3ee); font-family: var(--urup-body, Inter, system-ui); font-size: 14px; font-weight: 500; text-decoration: none; display: inline-flex; align-items: center"
          >
            Fortsæt med at shoppe →
          </NuxtLink>
        </div>

        <div v-else class="urup-split-2" style="display: grid; grid-template-columns: 1fr 380px; gap: 64px; align-items: start">
          <div style="display: flex; flex-direction: column; gap: 18px">
            <article
              v-for="line in cart.lines"
              :key="line.id"
              style="border-top: 1px solid rgba(28,26,23,0.12); padding-top: 24px"
            >
              <div style="display: flex; gap: 18px">
                <div style="width: 96px; flex-shrink: 0">
                  <div style="background: #ede8df; aspect-ratio: 4/5; overflow: hidden">
                    <img v-if="line.image" :src="line.image" :alt="line.title" style="width: 100%; height: 100%; object-fit: cover" />
                  </div>
                </div>

                <div style="flex: 1; display: flex; flex-direction: column; gap: 10px">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 14px">
                    <div>
                      <div style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-weight: 500; font-size: 22px; letter-spacing: -0.015em; line-height: 1.2">{{ line.title }}</div>
                      <div style="margin-top: 6px; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: var(--urup-textMuted, #857c70)">{{ line.price }}</div>
                    </div>
                    <button
                      type="button"
                      :disabled="loading"
                      @click="removeLine(line.id)"
                      style="border: 0; background: transparent; padding: 0; cursor: pointer; font-family: var(--urup-body, Inter, system-ui); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--urup-textMuted, #857c70)"
                    >
                      Fjern
                    </button>
                  </div>

                  <div style="display: flex; align-items: center; gap: 12px; margin-top: 10px">
                    <button
                      type="button"
                      :disabled="loading"
                      @click="handleQuantityChange(line.id, line.quantity - 1)"
                      style="width: 40px; height: 40px; border-radius: 999px; border: 1px solid rgba(28,26,23,0.18); background: transparent; cursor: pointer"
                    >
                      −
                    </button>
                    <span style="width: 32px; text-align: center; font-family: var(--urup-body, Inter, system-ui); font-size: 16px">{{ line.quantity }}</span>
                    <button
                      type="button"
                      :disabled="loading"
                      @click="handleQuantityChange(line.id, line.quantity + 1)"
                      style="width: 40px; height: 40px; border-radius: 999px; border: 1px solid rgba(28,26,23,0.18); background: transparent; cursor: pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <aside style="position: sticky; top: 100px">
            <div style="border: 1px solid rgba(28,26,23,0.12); border-radius: 18px; padding: 22px; background: rgba(255,255,255,0.55)">
              <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 18px">Oversigt</div>

              <div style="display: grid; gap: 10px; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: var(--urup-textMuted, #857c70)">
                <div style="display: flex; justify-content: space-between">
                  <span>Subtotal</span>
                  <span style="color: var(--urup-text, #1c1a17)">{{ cart.totalAmount }}</span>
                </div>
                <div style="display: flex; justify-content: space-between">
                  <span>Levering</span>
                  <span>Beregnes ved checkout</span>
                </div>
                <div style="display: flex; justify-content: space-between">
                  <span>Moms</span>
                  <span>Inkluderet</span>
                </div>
              </div>

              <div style="margin-top: 18px; padding-top: 18px; border-top: 1px solid rgba(28,26,23,0.12); display: flex; justify-content: space-between; font-family: var(--urup-body, Inter, system-ui); font-size: 16px">
                <span>I alt</span>
                <span style="color: var(--urup-text, #1c1a17)">{{ cart.totalAmount }}</span>
              </div>

              <a
                :href="cart.checkoutUrl"
                target="_blank"
                rel="noopener noreferrer"
                style="margin-top: 18px; height: 56px; border-radius: 999px; background: var(--urup-text, #1c1a17); color: var(--urup-pageBg, #f6f3ee); display: inline-flex; align-items: center; justify-content: center; width: 100%; text-decoration: none; font-family: var(--urup-body, Inter, system-ui); font-size: 15px; font-weight: 500"
              >
                Til checkout →
              </a>

              <NuxtLink
                to="/shop"
                style="margin-top: 12px; height: 56px; border-radius: 999px; border: 1px solid var(--urup-text, #1c1a17); background: transparent; color: var(--urup-text, #1c1a17); display: inline-flex; align-items: center; justify-content: center; width: 100%; text-decoration: none; font-family: var(--urup-body, Inter, system-ui); font-size: 15px; font-weight: 500"
              >
                Fortsæt shopping
              </NuxtLink>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>
