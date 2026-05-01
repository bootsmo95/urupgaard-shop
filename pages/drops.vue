<script setup lang="ts">
import { upcomingDrops } from '~/data/drops'
</script>

<template>
  <div style="background: var(--urup-pageBg, #f6f3ee); color: var(--urup-text, #1c1a17); min-height: 100vh">
    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 60px 54px 80px; border-bottom: 1px solid rgba(28,26,23,0.12)">
      <div style="max-width: 1440px; margin: 0 auto">
        <div style="display: flex; gap: 8px; font-family: var(--urup-body, Inter, system-ui); font-size: 13px; color: var(--urup-textMuted, #857c70); margin-bottom: 32px">
          <NuxtLink to="/" style="color: inherit; text-decoration: none">Forside</NuxtLink>
          <span style="opacity: 0.5">/</span>
          <span style="color: var(--urup-text, #1c1a17)">Drops</span>
        </div>

        <div class="urup-page-head urup-split-2" style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 80px; align-items: end">
          <div>
            <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 24px">
              Næste lanceringer
            </div>
            <h1 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-style: italic; font-size: clamp(44px, 6vw, 96px); line-height: 0.95; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0">
              Drops & små
              <em style="font-style: italic">serier</em>
            </h1>
          </div>
          <p style="font-family: var(--urup-body, Inter, system-ui); font-size: 18px; line-height: 1.55; color: var(--urup-textMuted, #857c70); margin: 0; padding-bottom: 8px; max-width: 420px">
            Countdown-baserede drops, limited runs og nye kollektioner.
          </p>
        </div>
      </div>
    </section>

    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 64px 54px 120px">
      <div style="max-width: 1440px; margin: 0 auto; display: flex; flex-direction: column; gap: 28px">
        <section v-for="drop in upcomingDrops" :key="drop.id" style="border-top: 1px solid rgba(28,26,23,0.12); padding-top: 32px">
          <div class="urup-split-2" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px; align-items: start">
            <div>
              <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 16px">
                {{ new Date(drop.launchAt).toLocaleString('da-DK') }}
              </div>
              <h2 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-style: italic; font-size: clamp(28px, 3.2vw, 48px); line-height: 1; letter-spacing: -0.015em; margin: 0">
                {{ drop.title }}
              </h2>
              <p style="margin-top: 18px; font-family: var(--urup-body, Inter, system-ui); font-size: 16px; line-height: 1.65; color: var(--urup-textMuted, #857c70); max-width: 520px">
                {{ drop.description }}
              </p>
              <p style="margin-top: 16px; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: var(--urup-textMuted, #857c70)">
                {{ drop.teaser }}
              </p>
            </div>
            <div style="border: 1px solid rgba(28,26,23,0.12); border-radius: 18px; padding: 18px; background: rgba(255,255,255,0.5)">
              <DropCountdown :target="drop.launchAt" />
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>
