<script setup lang="ts">
const props = defineProps<{
  name: string;
  icon?: string;
  url?: string;
}>();
</script>

<template>
  <NuxtLink
    :to="props.url || '#'"
    class="bg-white dark:bg-zinc-950 p-6 border border-gray-100 dark:border-zinc-800 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-all group"
  >
    <!-- <Icon
      :name="props.icon"
      class="w-10 h-10 text-gray-400 group-hover:text-blue-600 mb-4"
    /> -->

    <p
      class="font-bold text-sm dark:text-white group-hover:text-blue-600 transition"
    >
      {{ props.name }}
    </p>
  </NuxtLink>
</template>
