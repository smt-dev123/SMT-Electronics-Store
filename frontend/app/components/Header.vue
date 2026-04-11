<template>
  <header
    class="w-full bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-50"
  >
    <div
      class="container mx-auto px-4 h-16 flex items-center justify-between gap-8"
    >
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <div
          class="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform"
        >
          <IconCpu class="w-6 h-6 text-white" />
        </div>
        <span class="text-xl font-bold tracking-tight text-blue-600">
          SMT
          <span class="text-black dark:text-white">STORE</span>
        </span>
      </NuxtLink>

      <div class="hidden md:flex flex-1 max-w-xl relative group">
        <IconSearch
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors"
        />
        <input
          type="text"
          placeholder="ស្វែងរកគ្រឿង IoT, Arduino, Sensors..."
          class="w-full bg-gray-100 dark:bg-zinc-900 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500/50 outline-none text-sm dark:text-gray-200"
        />
      </div>

      <div class="flex items-center space-x-2">
        <div
          class="flex items-center text-xs font-bold text-gray-500 dark:text-zinc-400 border-r pr-4 border-gray-200 dark:border-zinc-800"
        >
          <span class="cursor-pointer hover:text-blue-600">KH</span>
          <span class="mx-1">/</span>
          <span class="cursor-pointer hover:text-blue-600 text-gray-300"
            >EN</span
          >
        </div>

        <button
          @click="toggleDark"
          class="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition"
        >
          <IconSun v-if="isDark" class="w-5 h-5 text-yellow-500" />
          <IconMoon v-else class="w-5 h-5 text-gray-600" />
        </button>

        <UiAddToCartWishlist />

        <NuxtLink
          to="/auth/login"
          class="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full relative group"
        >
          <IconLogIn
            class="w-5 h-5 text-gray-600 dark:text-zinc-300 group-hover:text-blue-600 transition"
          />
        </NuxtLink>
      </div>
    </div>

    <nav
      class="bg-gray-50 dark:bg-zinc-900/50 border-t border-gray-100 dark:border-zinc-800"
    >
      <div class="container mx-auto px-4 overflow-x-auto">
        <ul
          class="flex items-center justify-center space-x-8 py-3 text-sm font-medium text-gray-600 dark:text-zinc-400 whitespace-nowrap"
        >
          <li class="hover:text-blue-600">
            <NuxtLink to="/">ទំព័រដើម</NuxtLink>
          </li>
          <li
            class="flex items-center gap-1 hover:text-blue-600 cursor-pointer"
          >
            <nuxt-link to="/products">ផលិតផល</nuxt-link>
          </li>
          <li class="hover:text-blue-600">
            <NuxtLink to="/products_used">ផលិតផលបានប្រើប្រាស់</NuxtLink>
          </li>
          <li class="hover:text-blue-600">
            <NuxtLink to="/electronics">គ្រឿងអេឡិចត្រូនិច</NuxtLink>
          </li>
          <li class="hover:text-blue-600">
            <NuxtLink to="/lessons">អត្ថបទ/មេរៀន</NuxtLink>
          </li>
          <li class="hover:text-blue-600">
            <NuxtLink to="/about">អំពីយើង</NuxtLink>
          </li>
          <li class="hover:text-blue-600">
            <NuxtLink to="/contact">ទំនាក់ទំនង</NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
const isDark = ref(false);
const toggleDark = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
</script>

<style scoped>
.router-link-active {
  color: #2563eb; /* Tailwind's blue-600 */
  font-weight: 600;
}
</style>
