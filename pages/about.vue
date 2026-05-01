<template>
  <div style="background: var(--urup-pageBg, #f6f3ee); color: var(--urup-text, #1c1a17); min-height: 100vh">
    <!-- AboutHero -->
    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 0 54px">
      <div class="urup-about-hero" style="max-width: 1440px; margin: 0 auto; position: relative; aspect-ratio: 16/9; overflow: hidden">
        <img src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80" alt="" style="width: 100%; height: 100%; object-fit: cover" />
        <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(28,22,18,0.1) 0%, rgba(28,22,18,0.55) 100%)" />
        <div class="urup-about-hero-text" style="position: absolute; bottom: 60px; left: 60px; right: 60px; color: #f6f3ee">
          <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.85; margin-bottom: 24px">Urup, Fyn · Siden 2014</div>
          <h1 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-style: italic; font-size: clamp(56px, 7vw, 112px); line-height: 0.95; letter-spacing: -0.015em; margin: 0; max-width: 1000px">
            En lille gård,<br />
            <em style="font-style: italic">en stor ovn.</em>
          </h1>
        </div>
      </div>
    </section>

    <!-- AboutStory -->
    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 120px 54px">
      <div style="max-width: 1100px; margin: 0 auto">
        <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 24px">Urupgaard, kort</div>
        <p style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-weight: 500; font-size: clamp(28px, 3.2vw, 44px); line-height: 1.25; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0">
          Vi er en lille gård i Urup. Linda drejer keramik. Om sommeren står der blomster ved indkørslen, og vi sælger dem som man plukker dem.
        </p>

        <div class="urup-split-2" style="margin-top: 80px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px">
          <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 17px; line-height: 1.7; color: var(--urup-text, #1c1a17)">
            <p style="margin-bottom: 24px">Urupgaard er en familiedrevet gård på fem hektarer i Urup, lidt udenfor Langeskov.</p>
            <p style="margin-bottom: 24px">Keramikken er drevet ud fra en simpel idé: at gøre noget langsomt.</p>
            <p>Ved siden af keramikken har vi frilandsgrise og kødkvæg.</p>
          </div>
          <div style="aspect-ratio: 4/5; overflow: hidden; background: #ede8df">
            <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1000&q=80" alt="" style="width: 100%; height: 100%; object-fit: cover" />
          </div>
        </div>
      </div>
    </section>

    <!-- Process (reuse same look as homepage) -->
    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 120px 54px">
      <div style="max-width: 1440px; margin: 0 auto">
        <div class="urup-section-head" style="display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; margin-bottom: 56px">
          <div>
            <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 16px">Værkstedet</div>
            <h2 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-size: clamp(36px, 4.4vw, 64px); line-height: 1; letter-spacing: -0.015em; color: var(--urup-text, #1c1a17); margin: 0">Tre trin, ingen genveje</h2>
          </div>
        </div>

        <div class="urup-process-grid urup-grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px">
          <div style="display: flex; flex-direction: column; gap: 20px">
            <div style="aspect-ratio: 5/4; overflow: hidden; background: #ede8df">
              <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80" alt="" style="width: 100%; height: 100%; object-fit: cover" />
            </div>
            <div style="display: flex; align-items: baseline; gap: 18px">
              <span style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 36px; font-weight: 500; color: #3a342c; opacity: 0.7">01</span>
              <span style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 26px; font-weight: 500; letter-spacing: -0.015em">Ler fra Fyn</span>
            </div>
            <p style="font-family: var(--urup-body, Inter, system-ui); font-size: 15px; line-height: 1.6; color: var(--urup-textMuted, #857c70); margin: 0">Stentøjsler hentet hjem og lagret.</p>
          </div>
          <div style="display: flex; flex-direction: column; gap: 20px">
            <div style="aspect-ratio: 5/4; overflow: hidden; background: #ede8df">
              <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80" alt="" style="width: 100%; height: 100%; object-fit: cover" />
            </div>
            <div style="display: flex; align-items: baseline; gap: 18px">
              <span style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 36px; font-weight: 500; color: #3a342c; opacity: 0.7">02</span>
              <span style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 26px; font-weight: 500; letter-spacing: -0.015em">Drejes i hånden</span>
            </div>
            <p style="font-family: var(--urup-body, Inter, system-ui); font-size: 15px; line-height: 1.6; color: var(--urup-textMuted, #857c70); margin: 0">Hver vase er drejet i ét stykke.</p>
          </div>
          <div style="display: flex; flex-direction: column; gap: 20px">
            <div style="aspect-ratio: 5/4; overflow: hidden; background: #ede8df">
              <img src="https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=1200&q=80" alt="" style="width: 100%; height: 100%; object-fit: cover" />
            </div>
            <div style="display: flex; align-items: baseline; gap: 18px">
              <span style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 36px; font-weight: 500; color: #3a342c; opacity: 0.7">03</span>
              <span style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-style: italic; font-size: 26px; font-weight: 500; letter-spacing: -0.015em">Brændes 1240°</span>
            </div>
            <p style="font-family: var(--urup-body, Inter, system-ui); font-size: 15px; line-height: 1.6; color: var(--urup-textMuted, #857c70); margin: 0">Høj brænding giver det matte udtryk.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- VisitBlock (reuse same as homepage) -->
    <section style="background: var(--urup-pageBg, #f6f3ee); padding: 120px 54px; border-top: 1px solid rgba(28,26,23,0.12)">
      <div class="urup-split-2" style="max-width: 1440px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px">
        <div>
          <div style="font-family: var(--urup-body, Inter, system-ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); margin-bottom: 16px">Besøg gården</div>
          <h2 style="font-family: var(--urup-display, 'Cormorant Garamond', serif); font-weight: 500; font-size: clamp(40px, 5vw, 80px); line-height: 0.98; letter-spacing: -0.015em; margin: 0">Kig forbi —<br /><em style="font-style: italic">kaffen er klar.</em></h2>
          <p style="margin-top: 32px; font-family: var(--urup-body, Inter, system-ui); font-size: 17px; line-height: 1.6; color: var(--urup-textMuted, #857c70); max-width: 460px">Butikken ligger på selve gården.</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 24px; padding-top: 60px">
          <div style="display: grid; grid-template-columns: 120px 1fr; gap: 24px; padding-bottom: 24px; border-bottom: 1px solid rgba(28,26,23,0.12)">
            <span style="font-family: var(--urup-body, Inter, system-ui); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--urup-textMuted, #857c70); padding-top: 4px">Adresse</span>
            <span style="font-family: var(--urup-body, Inter, system-ui); font-size: 17px; line-height: 1.55; white-space: pre-line">Urupvej 109\n5550 Langeskov</span>
          </div>
          <NuxtLink to="/besoeg" style="margin-top: 8px; height: 52px; padding: 0 28px; border-radius: 999px; background: var(--urup-text, #1c1a17); color: var(--urup-pageBg, #f6f3ee); font-family: var(--urup-body, Inter, system-ui); font-size: 14px; font-weight: 500; text-decoration: none; display: inline-flex; align-items: center; width: fit-content">Find vej →</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
