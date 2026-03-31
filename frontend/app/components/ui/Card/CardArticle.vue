<script setup lang="ts">
const props = defineProps<{
  title: string;
  slug?: string;
  category?: string;
  level?: string;
  date?: string;
  excerpt?: string;
  author?: string;
  authorImage?: string;
  image?: string;
}>();
</script>

<template>
  <article
    class="group flex flex-col h-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 transition-all duration-300"
  >
    <!-- Image Section -->
    <div
      class="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800"
    >
      <img
        :src="props.image"
        :alt="props.title"
        class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      <!-- Level Badge -->
      <div v-if="props.level" class="absolute top-4 left-4">
        <span
          class="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wide shadow-sm"
        >
          {{ props.level }}
        </span>
      </div>
    </div>

    <!-- Content Section -->
    <div class="flex flex-col flex-grow p-6">
      <!-- Meta Data -->
      <div class="flex items-center gap-2 mb-4">
        <span
          class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider"
        >
          {{ props.category }}
        </span>
        <span class="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full"></span>
        <span
          class="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wide"
        >
          {{ props.date }}
        </span>
      </div>

      <!-- Title -->
      <h2
        class="text-xl font-bold text-zinc-900 dark:text-white mb-3 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
      >
        <NuxtLink :to="`/lessons/${props.slug}`" class="focus:outline-none">
          <span class="absolute inset-0"></span>
          {{ props.title }}
        </NuxtLink>
      </h2>

      <!-- Excerpt -->
      <p
        class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-6 flex-grow"
      >
        {{ props.excerpt }}
      </p>

      <!-- Footer / Author -->
      <div
        class="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between mt-auto"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden ring-2 ring-white dark:ring-zinc-900"
          >
            <img
              v-if="props.authorImage"
              :src="props.authorImage"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center text-zinc-400"
            >
              <Icon name="lucide:user" class="w-5 h-5" />
            </div>
          </div>
          <span class="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            {{ props.author }}
          </span>
        </div>

        <div
          class="w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
        >
          <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </div>
      </div>
    </div>
  </article>
</template>
