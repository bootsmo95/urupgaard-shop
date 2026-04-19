<script setup lang="ts">
import { upcomingDrops } from '~/data/drops'
</script>

<template>
  <div class="container-shell py-10">
    <div class="card p-8 lg:p-12">
      <p class="text-sm uppercase tracking-[0.35em] text-stone-500">Drops</p>
      <h1 class="mt-4 text-5xl text-stone-900">Planlagte lanceringer</h1>
      <p class="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
        Denne side er lavet som startpunkt til countdown-baserede drops, limited runs og nye kollektioner.
      </p>

      <div class="mt-10 space-y-6">
        <section v-for="drop in upcomingDrops" :key="drop.id" class="rounded-[28px] border border-black/5 bg-stone-50/80 p-6">
          <div class="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p class="text-xs uppercase tracking-[0.35em] text-stone-500">{{ new Date(drop.launchAt).toLocaleString('da-DK') }}</p>
              <h2 class="mt-3 text-3xl text-stone-900">{{ drop.title }}</h2>
              <p class="mt-4 max-w-xl text-stone-600">{{ drop.description }}</p>
              <p class="mt-4 text-sm text-stone-500">{{ drop.teaser }}</p>
            </div>
            <DropCountdown :target="drop.launchAt" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
