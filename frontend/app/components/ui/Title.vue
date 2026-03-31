<script setup lang="ts">
const props = defineProps<{
  title: string;
  url?: string;
}>();
</script>

<template>
  <div
    class="bg-zinc-50 dark:bg-zinc-900/30 border-b border-zinc-100 dark:border-zinc-800"
  >
    <div class="container mx-auto px-4 py-4">
      <nav
        class="flex text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-4"
      >
        <NuxtLink to="/" class="hover:text-blue-600">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink :to="props.url || '/'" class="hover:text-blue-600">{{
          props.title
        }}</NuxtLink>
      </nav>
      <h1
        class="text-xl md:text-2xl font-black dark:text-white uppercase tracking-tighter"
      >
        {{ props.title }}
      </h1>
    </div>
  </div>
</template>
