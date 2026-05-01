<script setup lang="ts">
const { data } = await useFetch('/api/products')
const products = computed(() => data.value?.products ?? [])

const { data: collectionsData } = await useFetch('/api/collections')
const collections = computed(() => collectionsData.value?.collections ?? [])
</script>

<template>
  <div style="background: var(--urup-pageBg, #f6f3ee); color: var(--urup-text, #1c1a17); min-height: 100vh">
    <!-- HERO (editorial split) -->
    <section style="background: var(--urup-pageBg, #f6f3ee)">
      <div class="urup-split-2 urup-hero-editorial" style="max-width: 1440px; margin: 0 auto; padding: 60px 54px 100px; display: grid; grid-template-columns: 1.15fr 1fr; gap: 60px; align-items: end">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 28px; font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70)">
            <span style="width: 24px; height: 1px; background: var(--urup-textMuted, #857c70)" />
            Forår 2026 · Ny serie
          </div>

          <h1 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-size: clamp(56px, 8vw, 132px); line-height: 0.92; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0">
            Drejet,<br />
            <em style="font-style: italic">brændt</em>,<br />
            sat på bord.
          </h1>

          <p style="margin-top: 36px; font-family: var(--urup-body, Inter, system-ui); font-size: 18px; line-height: 1.55; color: var(--urup-textMuted, #857c70); max-width: 460px">
            Linda drejer keramik på Urupgaard · én vase, én skål ad gangen. Sammen med brugskunst, blomster og kød fra gårdens egne dyr.
          </p>

          <div class="urup-hero-editorial-buttons" style="display: flex; gap: 14px; margin-top: 40px">
            <NuxtLink
              to="/shop"
              style="height: 52px; padding: 0 28px; border-radius: 999px; background: var(--urup-text, #1c1a17); color: var(--urup-pageBg, #f6f3ee); border: none; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; font-weight: 500; text-decoration: none; display: inline-flex; align-items: center; gap: 12px"
            >
              Se butikken <span style="transform: translateY(-1px)">→</span>
            </NuxtLink>
            <NuxtLink
              to="/drops"
              style="height: 52px; padding: 0 28px; border-radius: 999px; background: transparent; color: var(--urup-text, #1c1a17); border: 1px solid rgba(28, 26, 23, 0.25); font-family: var(--urup-body, Inter, system-ui); font-size: 14px; font-weight: 500; text-decoration: none; display: inline-flex; align-items: center; gap: 12px"
            >
              Næste drop <span style="transform: translateY(-1px)">→</span>
            </NuxtLink>
          </div>
        </div>

        <div style="position: relative; aspect-ratio: 4/5; overflow: hidden; background: #ede8df">
          <img
            src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1600&q=80"
            alt=""
            style="width: 100%; height: 100%; object-fit: cover; display: block"
          />
          <div style="position: absolute; bottom: 20px; left: 20px; right: 20px; background: rgba(246, 243, 238, 0.92); backdrop-filter: blur(8px); padding: 18px 22px; display: flex; justify-content: space-between; align-items: baseline; font-family: var(--urup-body, Inter, system-ui); font-size: 13px; color: var(--urup-text, #1c1a17)">
            <div>
              <div style="font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 4px">Udvalgt</div>
              <div style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 20px; font-weight: 500">Krus i nyt design</div>
            </div>
            <div style="font-size: 16px">399 kr.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Marquee (carousel-ish strip) -->
    <div class="urup-marquee" style="background: var(--urup-text, #1c1a17); color: var(--urup-pageBg, #f6f3ee); padding: 20px 0; overflow: hidden">
      <div class="urup-marquee-track" style="display: flex; width: max-content">
        <div style="display: flex; gap: 56px; padding-right: 56px; font-family: var(--urup-body, Inter, system-ui); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; flex-shrink: 0">
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Drejet i Urup <span style="opacity: 0.4">✦</span></span>
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Hver vase er unik <span style="opacity: 0.4">✦</span></span>
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Fyret én ad gangen <span style="opacity: 0.4">✦</span></span>
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Lokal afhentning <span style="opacity: 0.4">✦</span></span>
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Kød fra egne dyr <span style="opacity: 0.4">✦</span></span>
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Workshops året rundt <span style="opacity: 0.4">✦</span></span>
        </div>
        <div style="display: flex; gap: 56px; padding-right: 56px; font-family: var(--urup-body, Inter, system-ui); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; flex-shrink: 0">
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Drejet i Urup <span style="opacity: 0.4">✦</span></span>
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Hver vase er unik <span style="opacity: 0.4">✦</span></span>
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Fyret én ad gangen <span style="opacity: 0.4">✦</span></span>
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Lokal afhentning <span style="opacity: 0.4">✦</span></span>
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Kød fra egne dyr <span style="opacity: 0.4">✦</span></span>
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Workshops året rundt <span style="opacity: 0.4">✦</span></span>
        </div>
        <div style="display: flex; gap: 56px; padding-right: 56px; font-family: var(--urup-body, Inter, system-ui); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; flex-shrink: 0">
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Drejet i Urup <span style="opacity: 0.4">✦</span></span>
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Hver vase er unik <span style="opacity: 0.4">✦</span></span>
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Fyret én ad gangen <span style="opacity: 0.4">✦</span></span>
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Lokal afhentning <span style="opacity: 0.4">✦</span></span>
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Kød fra egne dyr <span style="opacity: 0.4">✦</span></span>
          <span style="display: inline-flex; align-items: center; gap: 56px; white-space: nowrap">Workshops året rundt <span style="opacity: 0.4">✦</span></span>
        </div>
      </div>
    </div>

    <!-- New drops (product list) -->
    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 120px 54px">
      <div style="max-width: 1440px; margin: 0 auto">
        <div class="urup-section-head" style="display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; margin-bottom: 56px">
          <div>
            <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 16px">Nye varer · Forår 2026</div>
            <h2 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-size: clamp(36px, 4.4vw, 64px); line-height: 1; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0; max-width: 760px">Friske fra ovnen</h2>
          </div>
          <NuxtLink to="/shop" style="font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: var(--urup-text, #1c1a17); text-decoration: none; border-bottom: 1px solid rgba(28,26,23,0.12); padding-bottom: 4px; white-space: nowrap">
            Se al keramik →
          </NuxtLink>
        </div>

        <div class="urup-grid-4" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 48px; row-gap: 56px">
          <NuxtLink
            v-for="p in products.slice(0, 8)"
            :key="p.id"
            :to="p.collectionHandle ? `/shop/${p.collectionHandle}/${p.handle}` : `/shop/keramik/${p.handle}`"
            style="text-decoration: none; color: inherit; display: flex; flex-direction: column; gap: 18px"
          >
            <div style="background: #ede8df; aspect-ratio: 4/5; overflow: hidden; position: relative">
              <img v-if="p.image" :src="p.image" :alt="p.title" style="width: 100%; height: 100%; object-fit: cover; display: block" />
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--urup-textMuted, #857c70)">
                {{ p.collectionTitle || 'Keramik' }}
              </div>
              <div style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-style: italic; font-size: 22px; color: var(--urup-text, #1c1a17); letter-spacing: -0.015em; line-height: 1.2">
                {{ p.title }}
              </div>
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: var(--urup-text, #1c1a17)">
                <span>{{ p.price }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Categories (collection list placeholder) -->
    <section style="background: #ffffff; padding: 120px 54px">
      <div style="max-width: 1440px; margin: 0 auto">
        <div class="urup-section-head" style="display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; margin-bottom: 56px">
          <div>
            <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 16px">Find rundt</div>
            <h2 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-size: clamp(36px, 4.4vw, 64px); line-height: 1; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0; max-width: 760px">Hvad leder du efter?</h2>
          </div>
          <NuxtLink to="/shop" style="font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: var(--urup-text, #1c1a17); text-decoration: none; border-bottom: 1px solid rgba(28,26,23,0.12); padding-bottom: 4px; white-space: nowrap">
            Hele butikken →
          </NuxtLink>
        </div>

        <div class="urup-grid-cat" style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px">
          <NuxtLink
            v-for="(c, i) in collections.slice(0, 6)"
            :key="c.id"
            :to="`/shop/${c.handle}`"
            style="text-decoration: none; color: inherit; display: flex; flex-direction: column; gap: 14px"
            :style="{ gridColumn: (i === 0 || i === 3) ? 'span 2' : 'span 1' }"
          >
            <div :style="{ aspectRatio: (i === 0 || i === 3) ? '2/1.4' : '1/1', background: '#ede8df', overflow: 'hidden' }">
              <img v-if="c.image" :src="c.image" :alt="c.title" style="width: 100%; height: 100%; object-fit: cover" />
            </div>
            <div style="display: flex; justify-content: space-between; align-items: baseline">
              <span style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 20px; font-weight: 500; color: var(--urup-text, #1c1a17)">{{ c.title }}</span>
              <span style="font-family: var(--urup-body, Inter, system-ui); font-size: 12px; color: var(--urup-textMuted, #857c70)">{{ c.productsCount ?? '' }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Story: Mød keramikeren -->
    <section style="background: #1c1a17; color: #f6f3ee; padding: 140px 54px">
      <div class="urup-split-2" style="max-width: 1440px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center">
        <div style="aspect-ratio: 4/5; overflow: hidden; background: #ede8df">
          <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80" alt="" style="width: 100%; height: 100%; object-fit: cover; filter: saturate(0.9)" />
        </div>
        <div>
          <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.6; margin-bottom: 24px">Mød keramikeren</div>
          <h2 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-style: italic; font-size: clamp(40px, 5vw, 80px); line-height: 0.98; letter-spacing: -0.015em; margin: 0">En kvinde, en drejeskive, en ovn</h2>
          <p style="margin-top: 36px; font-family: var(--urup-body, Inter, system-ui); font-size: 18px; line-height: 1.6; opacity: 0.85; max-width: 480px">
            Linda har drejet keramik på Urupgaard i over et årti. Hvert stykke begynder som en klump ler og ender på et bord.
          </p>
          <div class="urup-story-stats" style="margin-top: 48px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding-top: 36px; border-top: 1px solid rgba(245,237,224,0.18)">
            <div>
              <div style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 32px; font-weight: 500; margin-bottom: 6px">12 år</div>
              <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 13px; opacity: 0.7; line-height: 1.5">med ler i hænderne</div>
            </div>
            <div>
              <div style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 32px; font-weight: 500; margin-bottom: 6px">1 ovn</div>
              <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 13px; opacity: 0.7; line-height: 1.5">tændt om tirsdagen</div>
            </div>
            <div>
              <div style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 32px; font-weight: 500; margin-bottom: 6px">~40 stk</div>
              <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 13px; opacity: 0.7; line-height: 1.5">pr. fyring</div>
            </div>
          </div>
          <NuxtLink
            to="/contact"
            style="margin-top: 48px; height: 52px; padding: 0 28px; border-radius: 999px; background: #f6f3ee; color: #1c1a17; border: none; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center"
          >
            Læs om Linda →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Process: Værkstedet (3 steps) -->
    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 120px 54px">
      <div style="max-width: 1440px; margin: 0 auto">
        <div class="urup-section-head" style="display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; margin-bottom: 56px">
          <div>
            <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 16px">Værkstedet</div>
            <h2 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-size: clamp(36px, 4.4vw, 64px); line-height: 1; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0; max-width: 760px">Tre trin, ingen genveje</h2>
          </div>
          <NuxtLink to="/shop" style="font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: var(--urup-text, #1c1a17); text-decoration: none; border-bottom: 1px solid rgba(28,26,23,0.12); padding-bottom: 4px; white-space: nowrap">
            Se hele processen →
          </NuxtLink>
        </div>

        <div class="urup-process-grid urup-grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px">
          <div style="display: flex; flex-direction: column; gap: 20px">
            <div style="aspect-ratio: 5/4; overflow: hidden; background: #ede8df">
              <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80" alt="" style="width: 100%; height: 100%; object-fit: cover" />
            </div>
            <div style="display: flex; align-items: baseline; gap: 18px">
              <span style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 36px; font-weight: 500; color: #3a342c; opacity: 0.7">01</span>
              <span style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 26px; font-weight: 500; color: var(--urup-text, #1c1a17); letter-spacing: -0.015em">Ler fra Fyn</span>
            </div>
            <p style="font-family: var(--urup-body, Inter, system-ui); font-size: 15px; line-height: 1.6; color: var(--urup-textMuted, #857c70); margin: 0; max-width: 360px">Stentøjsler hentet hjem og lagret. Aldrig rent, vi blander selv.</p>
          </div>
          <div style="display: flex; flex-direction: column; gap: 20px">
            <div style="aspect-ratio: 5/4; overflow: hidden; background: #ede8df">
              <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80" alt="" style="width: 100%; height: 100%; object-fit: cover" />
            </div>
            <div style="display: flex; align-items: baseline; gap: 18px">
              <span style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 36px; font-weight: 500; color: #3a342c; opacity: 0.7">02</span>
              <span style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 26px; font-weight: 500; color: var(--urup-text, #1c1a17); letter-spacing: -0.015em">Drejes i hånden</span>
            </div>
            <p style="font-family: var(--urup-body, Inter, system-ui); font-size: 15px; line-height: 1.6; color: var(--urup-textMuted, #857c70); margin: 0; max-width: 360px">Hver vase er drejet i ét stykke. Små asymmetrier er kendetegn.</p>
          </div>
          <div style="display: flex; flex-direction: column; gap: 20px">
            <div style="aspect-ratio: 5/4; overflow: hidden; background: #ede8df">
              <img src="https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=1200&q=80" alt="" style="width: 100%; height: 100%; object-fit: cover" />
            </div>
            <div style="display: flex; align-items: baseline; gap: 18px">
              <span style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 36px; font-weight: 500; color: #3a342c; opacity: 0.7">03</span>
              <span style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 26px; font-weight: 500; color: var(--urup-text, #1c1a17); letter-spacing: -0.015em">Brændes 1240°</span>
            </div>
            <p style="font-family: var(--urup-body, Inter, system-ui); font-size: 15px; line-height: 1.6; color: var(--urup-textMuted, #857c70); margin: 0; max-width: 360px">Glasur strøget i bånd. Høj brænding giver det matte udtryk.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 50/50 image CTA -->
    <section style="background: #ffffff; padding: 120px 54px">
      <div class="urup-workshop-grid urup-split-2" style="max-width: 1440px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 32px">
        <div style="position: relative; aspect-ratio: 4/3; overflow: hidden">
          <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80" alt="" style="width: 100%; height: 100%; object-fit: cover" />
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(28,22,18,0) 30%, rgba(28,22,18,0.7) 100%)" />
          <div style="position: absolute; inset: 0; padding: 40px; display: flex; flex-direction: column; justify-content: space-between; color: #f6f3ee">
            <div style="display: flex; gap: 8px">
              <span style="padding: 6px 12px; border-radius: 999px; background: rgba(245,237,224,0.18); backdrop-filter: blur(8px); font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase">Workshops</span>
              <span style="padding: 6px 12px; border-radius: 999px; background: rgba(245,237,224,0.18); backdrop-filter: blur(8px); font-family: var(--urup-body, Inter, system-ui); font-size: 11px">Næste · 18. maj kl. 10</span>
            </div>
            <div>
              <h3 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-weight: 500; font-size: clamp(32px, 3.4vw, 52px); line-height: 1; letter-spacing: -0.015em; margin: 0; max-width: 380px">Lær at dreje en skål</h3>
              <p style="margin-top: 18px; font-family: var(--urup-body, Inter, system-ui); font-size: 15px; line-height: 1.55; opacity: 0.9; max-width: 420px">Tre timer ved drejeskiven, kaffe, og din egen skål med hjem efter brænding.</p>
              <div style="margin-top: 28px">
                <NuxtLink to="/contact" style="height: 48px; padding: 0 24px; border-radius: 999px; background: #f6f3ee; color: var(--urup-text, #1c1a17); border: none; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; font-weight: 500; text-decoration: none; display: inline-flex; align-items: center">Book plads →</NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div style="position: relative; aspect-ratio: 4/3; overflow: hidden">
          <img src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=1200&q=80" alt="" style="width: 100%; height: 100%; object-fit: cover" />
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(28,22,18,0) 30%, rgba(28,22,18,0.7) 100%)" />
          <div style="position: absolute; inset: 0; padding: 40px; display: flex; flex-direction: column; justify-content: space-between; color: #f6f3ee">
            <div style="display: flex; gap: 8px">
              <span style="padding: 6px 12px; border-radius: 999px; background: rgba(245,237,224,0.18); backdrop-filter: blur(8px); font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase">Gården</span>
              <span style="padding: 6px 12px; border-radius: 999px; background: rgba(245,237,224,0.18); backdrop-filter: blur(8px); font-family: var(--urup-body, Inter, system-ui); font-size: 11px">Næste leverance · juni</span>
            </div>
            <div>
              <h3 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-weight: 500; font-size: clamp(32px, 3.4vw, 52px); line-height: 1; letter-spacing: -0.015em; margin: 0; max-width: 380px">Kød fra egne dyr</h3>
              <p style="margin-top: 18px; font-family: var(--urup-body, Inter, system-ui); font-size: 15px; line-height: 1.55; opacity: 0.9; max-width: 420px">Frilandsgrise og kødkvæg, opdrættet og solgt direkte fra gården.</p>
              <div style="margin-top: 28px">
                <NuxtLink to="/shop" style="height: 48px; padding: 0 24px; border-radius: 999px; background: #f6f3ee; color: var(--urup-text, #1c1a17); border: none; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; font-weight: 500; text-decoration: none; display: inline-flex; align-items: center">Se sortiment →</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- VisitBlock -->
    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 120px 54px; border-top: 1px solid rgba(28,26,23,0.12)">
      <div class="urup-split-2" style="max-width: 1440px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px">
        <div>
          <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 16px">Besøg gården</div>
          <h2 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-size: clamp(40px, 5vw, 80px); line-height: 0.98; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0">
            Kig forbi —<br />
            <em style="font-style: italic">kaffen er klar.</em>
          </h2>
          <p style="margin-top: 32px; font-family: var(--urup-body, Inter, system-ui); font-size: 17px; line-height: 1.6; color: var(--urup-textMuted, #857c70); max-width: 460px">
            Butikken ligger på selve gården. Kig ind i værkstedet, sig hej til dyrene, og tag det med hjem du falder for.
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 24px; padding-top: 60px">
          <div style="display: grid; grid-template-columns: 120px 1fr; gap: 24px; padding-bottom: 24px; border-bottom: 1px solid rgba(28,26,23,0.12)">
            <span style="font-family: var(--urup-body, Inter, system-ui); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); padding-top: 4px">Adresse</span>
            <span style="font-family: var(--urup-body, Inter, system-ui); font-size: 17px; line-height: 1.55; color: var(--urup-text, #1c1a17); white-space: pre-line">Urupvej 109\n5550 Langeskov</span>
          </div>
          <div style="display: grid; grid-template-columns: 120px 1fr; gap: 24px; padding-bottom: 24px; border-bottom: 1px solid rgba(28,26,23,0.12)">
            <span style="font-family: var(--urup-body, Inter, system-ui); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); padding-top: 4px">Åbent</span>
            <span style="font-family: var(--urup-body, Inter, system-ui); font-size: 17px; line-height: 1.55; color: var(--urup-text, #1c1a17); white-space: pre-line">Torsdag–lørdag · 10–16\nSøndag · 11–15</span>
          </div>
          <div style="display: grid; grid-template-columns: 120px 1fr; gap: 24px; padding-bottom: 24px; border-bottom: 1px solid rgba(28,26,23,0.12)">
            <span style="font-family: var(--urup-body, Inter, system-ui); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); padding-top: 4px">Kontakt</span>
            <span style="font-family: var(--urup-body, Inter, system-ui); font-size: 17px; line-height: 1.55; color: var(--urup-text, #1c1a17); white-space: pre-line">Linda Sørensen\n+45 24 67 12 89\nlinda@urupgaard-butik.dk</span>
          </div>

          <NuxtLink
            to="/contact"
            style="margin-top: 8px; height: 52px; padding: 0 28px; border-radius: 999px; background: var(--urup-text, #1c1a17); color: var(--urup-pageBg, #f6f3ee); border: none; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; font-weight: 500; text-decoration: none; display: inline-flex; align-items: center; width: fit-content"
          >
            Find vej →
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes urupMarquee {
  from { transform: translateX(0); }
  to { transform: translateX(-33.333%); }
}
.urup-marquee-track {
  animation: urupMarquee 40s linear infinite;
}
</style>
