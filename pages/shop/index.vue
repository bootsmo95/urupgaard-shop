<script setup lang="ts">
const { data: collectionsData } = await useFetch('/api/collections')

const collections = computed(() => collectionsData.value?.collections ?? [])
</script>

<template>
  <div class="container-shell py-8 lg:py-10">
    <div class="mb-10">
      <p class="editorial-kicker">Shop</p>
      <h1 class="mt-3 text-6xl leading-none text-stone-900">Kollektioner</h1>
      <p class="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
        Udforsk vores kuraterede kollektioner af håndlavet keramik.
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="collection in collections"
        :key="collection.id"
        :to="`/shop/${collection.handle}`"
        class="group card overflow-hidden p-8 transition duration-300 hover:shadow-lg"
      >
        <div class="mb-6 h-48 overflow-hidden rounded-2xl bg-stone-100">
          <img
            v-if="collection.image"
            :src="collection.image"
            :alt="collection.title"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <h3 class="text-3xl text-stone-900">{{ collection.title }}</h3>
        <p v-if="collection.description" class="mt-3 line-clamp-2 text-sm leading-7 text-stone-600">
          {{ collection.description }}
        </p>
        <p class="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500 group-hover:text-stone-900">
          Se kollektion →
        </p>
      </NuxtLink>
    </div>
  </div>
</template>
