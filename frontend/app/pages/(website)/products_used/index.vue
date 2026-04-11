<template>
  <div class="bg-white dark:bg-zinc-950 min-h-screen">
    <UiTitle title="ផលិតផលបានប្រើប្រាស់" url="/products_used" />

    <div class="container mx-auto px-4 py-8">
      <div class="md:hidden mb-6">
        <button
          @click="isMobileFilterOpen = true"
          class="w-full flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-900 py-3 font-bold text-sm uppercase tracking-wider"
        >
          <IconSearch class="w-4 h-4" />
          តម្រងស្វែងរក
        </button>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
        <aside class="hidden md:block w-64 flex-shrink-0 space-y-8">
          <div>
            <h3
              class="font-black text-sm uppercase tracking-widest mb-4 dark:text-white border-b-2 border-blue-600 inline-block"
            >
              ប្រភេទ
            </h3>
            <div class="space-y-3 mt-4">
              <label
                v-for="cat in categories"
                :key="cat"
                class="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors"
              >
                <input type="checkbox" class="w-4 h-4 accent-blue-600" />
                <span class="text-sm dark:text-zinc-400">{{ cat }}</span>
              </label>
            </div>
          </div>

          <div>
            <h3
              class="font-black text-sm uppercase tracking-widest mb-4 dark:text-white border-b-2 border-blue-600 inline-block"
            >
              តម្លៃ ($)
            </h3>
            <div class="mt-4 space-y-4">
              <input
                type="range"
                min="0"
                max="500"
                class="w-full h-1 bg-zinc-200 dark:bg-zinc-800 accent-blue-600 cursor-pointer"
              />
              <div
                class="flex justify-between text-xs font-mono dark:text-zinc-400"
              >
                <span>$0</span>
                <span>$500</span>
              </div>
            </div>
          </div>
        </aside>

        <section class="flex-1">
          <div
            class="flex justify-between items-center mb-8 bg-zinc-50 dark:bg-zinc-900/50 p-4 border border-zinc-100 dark:border-zinc-800"
          >
            <p class="text-sm text-zinc-500">
              បង្ហាញជម្រើសទាំង
              <span class="font-bold text-zinc-900 dark:text-white">24</span>
              ផលិតផល
            </p>
            <select
              class="bg-transparent text-sm font-bold focus:outline-none dark:text-white"
            >
              <option>ផលិតផលថ្មីបំផុត</option>
              <option>តម្លៃ៖ ទាប ទៅ ខ្ពស់</option>
              <option>តម្លៃ៖ ខ្ពស់ ទៅ ទាប</option>
            </select>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            <Card
              v-for="product in products"
              :key="product.id"
              :name="product.name"
              :category="product.category"
              :price="product.price"
              :oldPrice="product.oldPrice"
              :image="product.image"
            />
          </div>

          <div class="mt-16 flex justify-center gap-2">
            <button
              class="w-10 h-10 border dark:border-zinc-800 flex items-center justify-center dark:text-white hover:bg-blue-600 hover:text-white transition"
            >
              1
            </button>
            <button
              class="w-10 h-10 border dark:border-zinc-800 flex items-center justify-center dark:text-white bg-zinc-100 dark:bg-zinc-800 font-bold"
            >
              2
            </button>
            <button
              class="w-10 h-10 border dark:border-zinc-800 flex items-center justify-center dark:text-white hover:bg-blue-600 hover:text-white transition"
            >
              3
            </button>
          </div>
        </section>
      </div>
    </div>

    <Transition name="slide">
      <div v-if="isMobileFilterOpen" class="fixed inset-0 z-[60] flex">
        <div
          class="absolute inset-0 bg-black/50"
          @click="isMobileFilterOpen = false"
        ></div>
        <div
          class="relative w-80 bg-white dark:bg-zinc-950 h-full p-6 shadow-2xl overflow-y-auto"
        >
          <div class="flex justify-between items-center mb-8">
            <h2 class="font-black uppercase tracking-widest dark:text-white">
              Filters
            </h2>
            <button @click="isMobileFilterOpen = false">
              <IconX class="w-6 h-6 dark:text-white" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import Card from "~/components/ui/Card/Card.vue";

const isMobileFilterOpen = ref(false);

const categories = [
  "Arduino Panels",
  "Sensors & Modules",
  "IoT Kits",
  "Robot Parts",
  "Power Supply",
];

const products = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: `ESP32-WROOM-32D Development Board WiFi + Bluetooth Version ${i + 1}`,
  category: "IoT Modules",
  price: 8.5 + i,
  oldPrice: 10.0 + i,
  image:
    "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=600&auto=format&fit=crop",
}));
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
