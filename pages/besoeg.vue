<template>
  <div style="background: var(--urup-pageBg, #f6f3ee); color: var(--urup-text, #1c1a17); min-height: 100vh">
    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 60px 54px 80px; border-bottom: 1px solid rgba(28,26,23,0.12)">
      <div style="max-width: 1440px; margin: 0 auto">
        <div style="display: flex; gap: 8px; font-family: var(--urup-body, Inter, system-ui); font-size: 13px; color: var(--urup-textMuted, #857c70); margin-bottom: 32px">
          <NuxtLink to="/" style="color: inherit; text-decoration: none">Forside</NuxtLink>
          <span style="opacity: 0.5">/</span>
          <span style="color: var(--urup-text, #1c1a17)">Besøg</span>
        </div>

        <div class="urup-page-head urup-split-2" style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 80px; align-items: end">
          <div>
            <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 24px">
              Urupvej 109 · 5550 Langeskov
            </div>
            <h1 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-style: italic; font-size: clamp(44px, 6vw, 96px); line-height: 0.95; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0">
              Kig forbi.<br />
              <em style="font-style: italic">Vi sætter kaffe over.</em>
            </h1>
          </div>
          <p style="font-family: var(--urup-body, Inter, system-ui); font-size: 18px; line-height: 1.55; color: var(--urup-textMuted, #857c70); margin: 0; padding-bottom: 8px; max-width: 420px">
            Butikken og værkstedet ligger på selve gården i Urup, lidt udenfor Langeskov. Du kan kigge over skulderen mens jeg drejer, og hilse på grisene på vejen ud.
          </p>
        </div>
      </div>
    </section>

    <!-- Map (stylised SVG placeholder like prototype) -->
    <section class="urup-visit-map" style="padding: 0 54px">
      <div style="max-width: 1440px; margin: 0 auto; position: relative; aspect-ratio: 21/9; overflow: hidden; background: #ede8df">
        <svg viewBox="0 0 800 360" style="width: 100%; height: 100%; display: block; background: #ede8df">
          <defs>
            <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.7" fill="#857c70" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="800" height="360" fill="url(#dots)" />
          <path d="M 0 200 Q 200 180 400 220 T 800 200" stroke="#857c70" stroke-width="2" fill="none" opacity="0.5" />
          <path d="M 100 0 Q 150 150 200 200 T 250 360" stroke="#857c70" stroke-width="1.5" fill="none" opacity="0.4" />
          <path d="M 600 0 Q 580 100 550 200 Q 520 280 480 360" stroke="#857c70" stroke-width="1.5" fill="none" opacity="0.4" />
          <g transform="translate(400, 180)">
            <circle r="48" fill="#1c1a17" opacity="0.08" />
            <circle r="32" fill="#1c1a17" opacity="0.12" />
            <circle r="14" fill="#1c1a17" />
            <circle r="6" fill="#f6f3ee" />
          </g>
          <text x="420" y="155" font-family="Cormorant Garamond" font-size="22" font-style="italic" font-weight="500" fill="#1c1a17" letter-spacing="-0.015em">Urupgaard</text>
          <text x="420" y="178" font-family="Inter" font-size="12" fill="#857c70" letter-spacing="0.06em">URUPVEJ 109 · 5550 LANGESKOV</text>
        </svg>
      </div>
    </section>

    <!-- Info -->
    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 100px 54px">
      <div class="urup-visit-info urup-split-2" style="max-width: 1440px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.5fr; gap: 100px">
        <div style="position: sticky; top: 100px; align-self: start">
          <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 24px">Praktisk</div>
          <h2 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-style: italic; font-size: clamp(32px, 3.6vw, 56px); line-height: 1; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0">Sådan kommer du forbi</h2>
          <p style="margin-top: 24px; font-family: var(--urup-body, Inter, system-ui); font-size: 16px; line-height: 1.65; color: var(--urup-textMuted, #857c70); max-width: 360px">
            Butikken ligger på selve gården. Du behøver ikke ringe først, men gør du det, kan vi sætte kaffe over.
          </p>
        </div>

        <div style="display: flex; flex-direction: column">
          <div class="urup-visit-row" style="display: grid; grid-template-columns: 180px 1fr; gap: 32px; padding: 40px 0; border-top: 1px solid rgba(28,26,23,0.12); align-items: start">
            <span style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-weight: 500; font-size: 24px; color: var(--urup-text, #1c1a17)">Adresse</span>
            <div>
              <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 17px; line-height: 1.7; color: var(--urup-text, #1c1a17); white-space: pre-line">Urupvej 109\n5550 Langeskov</div>
              <a href="https://www.google.com/maps/search/?api=1&query=Urupvej+109,+5550+Langeskov" target="_blank" rel="noopener" style="display: inline-block; margin-top: 16px; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: #3a342c; text-decoration: none; border-bottom: 1px solid #3a342c; padding-bottom: 2px">Find vej i Google Maps →</a>
            </div>
          </div>

          <div class="urup-visit-row" style="display: grid; grid-template-columns: 180px 1fr; gap: 32px; padding: 40px 0; border-top: 1px solid rgba(28,26,23,0.12); align-items: start">
            <span style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-weight: 500; font-size: 24px; color: var(--urup-text, #1c1a17)">Åbningstider</span>
            <div>
              <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 17px; line-height: 1.7; color: var(--urup-text, #1c1a17); white-space: pre-line">Torsdag · 10–16\nFredag · 10–18\nLørdag · 10–16\nSøndag · 11–15</div>
              <span style="display: inline-block; margin-top: 16px; font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: var(--urup-textMuted, #857c70)">Lukket mandag–onsdag (jeg drejer)</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section style="background: #ffffff; padding: 120px 54px">
      <div style="max-width: 1440px; margin: 0 auto">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px">
          <h2 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-style: italic; font-size: clamp(32px, 3.6vw, 56px); line-height: 1; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0; max-width: 600px">Sådan ser her ud</h2>
          <span style="font-family: var(--urup-body, Inter, system-ui); font-size: 14px; color: var(--urup-textMuted, #857c70)">4 stykker af gården</span>
        </div>

        <div class="urup-visit-gallery urup-grid-4" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px">
          <div v-for="i in 4" :key="i" style="display: flex; flex-direction: column; gap: 14px">
            <div style="aspect-ratio: 4/5; overflow: hidden; background: #ede8df">
              <img :src="i === 1 ? 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80' : i === 2 ? 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80' : i === 3 ? 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=1200&q=80' : 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80'" alt="" style="width: 100%; height: 100%; object-fit: cover" />
            </div>
            <div style="display: flex; justify-content: space-between; align-items: baseline">
              <span style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-weight: 500; font-size: 18px; color: var(--urup-text, #1c1a17)">Billede {{ i }}</span>
              <span style="font-family: var(--urup-body, Inter, system-ui); font-size: 12px; color: var(--urup-textMuted, #857c70); letter-spacing: 0.04em">Urupgaard</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact (re-use existing ContactForm for actual functionality) -->
    <section style="background: #1c1a17; color: #f6f3ee; padding: 120px 54px">
      <div class="urup-visit-contact urup-split-2" style="max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px">
        <div>
          <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.6; margin-bottom: 24px">Skriv til Linda</div>
          <h2 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-style: italic; font-size: clamp(36px, 4.4vw, 64px); line-height: 1; letter-spacing: -0.015em; margin: 0">Et spørgsmål?<br /><em style="font-style: italic">Bare skriv.</em></h2>
          <p style="margin-top: 24px; font-family: var(--urup-body, Inter, system-ui); font-size: 16px; line-height: 1.65; opacity: 0.8; max-width: 360px">
            Jeg svarer som regel inden for et døgn.
          </p>
          <div style="margin-top: 48px; display: flex; flex-direction: column; gap: 12px; font-family: var(--urup-body, Inter, system-ui); font-size: 15px">
            <a href="mailto:linda@urupgaard-butik.dk" style="color: inherit; text-decoration: none; border-bottom: 1px solid rgba(245,237,224,0.3); padding-bottom: 4px; width: fit-content">linda@urupgaard-butik.dk</a>
            <a href="tel:+4524671289" style="color: inherit; text-decoration: none; border-bottom: 1px solid rgba(245,237,224,0.3); padding-bottom: 4px; width: fit-content">+45 24 67 12 89</a>
          </div>
        </div>

        <div style="background: rgba(246,243,238,0.06); border: 1px solid rgba(245,237,224,0.18); border-radius: 18px; padding: 28px">
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
</template>
