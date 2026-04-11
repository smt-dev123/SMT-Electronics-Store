<script setup lang="ts">
const props = defineProps<{
  name: string;
  slug?: string;
  discount?: number;
  category?: string;
  image?: string;
  price?: number;
  oldPrice?: number;
}>();
</script>

<template>
  <div
    class="group border border-gray-200 dark:border-zinc-800 relative rounded overflow-hidden bg-white dark:bg-zinc-900 transition-all hover:shadow-xl"
  >
    <div class="h-[200px] overflow-hidden bg-gray-100 dark:bg-zinc-800">
      <img
        :src="props.image"
        :alt="props.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>

    <div class="absolute top-2 left-2">
      <span
        class="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 uppercase"
        >{{ props.discount }}% OFF</span
      >
    </div>

    <div class="p-4">
      <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
        {{ props.category }}
      </p>
      <h3
        class="font-bold text-sm md:text-base dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition"
      >
        <nuxt-link :to="`/products/${props.slug}`">
          {{ props.name }}
        </nuxt-link>
      </h3>

      <div class="flex items-center justify-between mt-4">
        <div class="flex flex-col">
          <span class="font-bold text-lg text-blue-600"
            >${{ props.price }}</span
          >
          <span class="text-md text-gray-400 line-through"
            >${{ props.oldPrice }}</span
          >
        </div>
        <button
          class="bg-zinc-100 rounded overflow-hidden dark:bg-zinc-900 hover:bg-blue-600 hover:text-white p-3 transition-colors group/btn"
        >
          <IconShoppingBag class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>
