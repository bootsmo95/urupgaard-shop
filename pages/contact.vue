<script setup lang="ts">
const contactDetails = {
  email: 'hello@urupgaard.dk',
  phone: 'Tilføj nummer i Shopify'
}

useSeoMeta({
  title: 'Kontakt | Urupgaard',
  description: 'Skriv til Urupgaard om produkter, levering, drops eller specialbestillinger.'
})
</script>

<template>
  <div class="container-shell py-8 lg:py-10">
    <section class="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div class="card overflow-hidden p-8 lg:p-10">
        <p class="editorial-kicker">Kontakt os</p>
        <h1 class="mt-4 text-6xl leading-[0.94] text-stone-900 md:text-7xl">Rolig kundeservice, helt uden callcenter-energi.</h1>
        <p class="mt-6 max-w-xl text-base leading-8 text-stone-600 md:text-lg">
          Har du spørgsmål om keramik, levering eller et kommende drop, så skriv. Vi samler alle henvendelser ét sted og svarer så hurtigt vi kan.
        </p>

        <div class="mt-10 grid gap-4">
          <div class="soft-panel p-5">
            <p class="editorial-kicker">E-mail</p>
            <a
              :href="`mailto:${contactDetails.email}`"
              class="mt-3 inline-flex text-2xl text-stone-900 underline decoration-stone-300 underline-offset-4"
            >
              {{ contactDetails.email }}
            </a>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="soft-panel p-5">
              <p class="editorial-kicker">Telefon</p>
              <p class="mt-3 text-lg text-stone-900">{{ contactDetails.phone }}</p>
              <p class="mt-2 text-sm leading-7 text-stone-500">Bedst til korte spørgsmål eller praktiske aftaler.</p>
            </div>

            <div class="soft-panel p-5">
              <p class="editorial-kicker">Svartid</p>
              <p class="mt-3 text-lg text-stone-900">1 til 2 hverdage</p>
              <p class="mt-2 text-sm leading-7 text-stone-500">Vi læser alt manuelt og svarer personligt.</p>
            </div>
          </div>
        </div>
      </div>

      <ContactForm />
    </section>
  </div>
</template>
