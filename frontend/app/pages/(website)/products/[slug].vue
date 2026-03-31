<template>
  <div class="bg-white dark:bg-zinc-950 min-h-screen pb-20">
    <div class="container mx-auto px-4 md:px-12 py-10">
      <nav
        class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-10"
      >
        <NuxtLink to="/products" class="hover:text-blue-600">Products</NuxtLink>
        <Icon name="lucide:chevron-right" class="w-3 h-3" />
        <span class="text-zinc-900 dark:text-zinc-200">{{
          product.category
        }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div class="lg:col-span-7 space-y-4">
          <div
            class="aspect-square bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-12 flex items-center justify-center overflow-hidden"
          >
            <img
              :src="activeImage"
              class="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
            />
          </div>

          <div class="grid grid-cols-5 gap-4">
            <button
              v-for="(img, index) in product.images"
              :key="index"
              @click="activeImage = img"
              class="aspect-square border-2 p-2 transition-all"
              :class="
                activeImage === img
                  ? 'border-blue-600 bg-blue-50/10'
                  : 'border-zinc-100 dark:border-zinc-800 hover:border-zinc-300'
              "
            >
              <img :src="img" class="w-full h-full object-contain" />
            </button>
          </div>
        </div>

        <div class="lg:col-span-5 flex flex-col">
          <div class="border-b border-zinc-100 dark:border-zinc-900 pb-8 mb-8">
            <span
              class="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 block"
              >{{ product.brand }}</span
            >
            <h1
              class="text-3xl md:text-5xl font-black dark:text-white uppercase tracking-tighter leading-tight mb-6"
            >
              {{ product.name }}
            </h1>
            <div class="flex items-center gap-4">
              <span class="text-3xl font-black text-zinc-950 dark:text-white"
                >${{ product.price.toFixed(2) }}</span
              >
              <span
                v-if="product.oldPrice"
                class="text-xl text-zinc-400 line-through"
                >${{ product.oldPrice.toFixed(2) }}</span
              >
              <span
                class="bg-red-500 text-white text-[10px] font-black px-2 py-1 uppercase"
                >-15% OFF</span
              >
            </div>
          </div>

          <div class="space-y-8">
            <p
              class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-light"
            >
              {{ product.shortDescription }}
            </p>

            <div class="flex items-center gap-2">
              <div
                class="w-2 h-2 rounded-full bg-green-500 animate-pulse"
              ></div>
              <span
                class="text-[10px] font-black uppercase tracking-widest dark:text-zinc-300"
                >មានក្នុងស្តុក (In Stock: 45 units)</span
              >
            </div>

            <div class="flex gap-4">
              <div class="flex border border-zinc-200 dark:border-zinc-800">
                <button
                  @click="qty > 1 ? qty-- : null"
                  class="w-12 h-12 flex items-center justify-center dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  -
                </button>
                <input
                  type="number"
                  v-model="qty"
                  class="w-12 h-12 text-center bg-transparent dark:text-white font-bold outline-none border-x border-zinc-200 dark:border-zinc-800"
                />
                <button
                  @click="qty++"
                  class="w-12 h-12 flex items-center justify-center dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  +
                </button>
              </div>
              <button
                class="flex-1 bg-blue-600 text-white font-black uppercase tracking-widest text-xs hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black transition-all flex items-center justify-center gap-3"
              >
                <Icon name="lucide:shopping-cart" class="w-4 h-4" />
                បន្ថែមទៅក្នុងកញ្ចប់
              </button>
            </div>

            <div class="flex gap-6 pt-4">
              <button
                class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-red-500 transition-colors"
              >
                <Icon name="lucide:heart" class="w-4 h-4" />
                បន្ថែមទៅបញ្ជីប្រាថ្នា
              </button>
              <button
                class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-blue-600 transition-colors"
              >
                <Icon name="lucide:share-2" class="w-4 h-4" /> ចែករំលែក
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-32">
        <div class="flex border-b border-zinc-100 dark:border-zinc-900 gap-10">
          <button
            v-for="tab in ['Description', 'Specifications', 'Datasheet']"
            :key="tab"
            @click="activeTab = tab"
            class="pb-6 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative"
            :class="
              activeTab === tab
                ? 'text-blue-600'
                : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            "
          >
            {{ tab }}
            <div
              v-if="activeTab === tab"
              class="absolute bottom-0 left-0 w-full h-1 bg-blue-600"
            ></div>
          </button>
        </div>

        <div class="py-12 max-w-4xl">
          <div
            v-if="activeTab === 'Description'"
            class="prose prose-zinc dark:prose-invert max-w-none"
          >
            <p
              class="text-zinc-500 dark:text-zinc-400 leading-loose text-lg font-light"
            >
              {{ product.longDescription }}
            </p>
          </div>

          <div v-if="activeTab === 'Specifications'" class="space-y-4">
            <div
              v-for="(val, key) in product.specs"
              :key="key"
              class="flex border-b border-zinc-50 dark:border-zinc-900 py-4"
            >
              <span
                class="w-48 text-[10px] font-black uppercase tracking-widest text-zinc-400"
                >{{ key }}</span
              >
              <span class="text-sm font-bold dark:text-white">{{ val }}</span>
            </div>
          </div>

          <div
            v-if="activeTab === 'Datasheet'"
            class="p-10 border-2 border-dashed border-zinc-100 dark:border-zinc-800 text-center"
          >
            <Icon
              name="lucide:file-text"
              class="w-12 h-12 text-zinc-300 mx-auto mb-4"
            />
            <p
              class="text-sm font-bold dark:text-white mb-4 italic uppercase tracking-widest"
            >
              ESP32_WROOM_32_Datasheet.pdf
            </p>
            <button
              class="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const qty = ref(1);
const activeTab = ref("Description");

const product = {
  name: "ESP32-WROOM-32D Development Board WiFi + Bluetooth",
  brand: "ESPRESSIF",
  category: "IoT Modules",
  price: 8.5,
  oldPrice: 10.0,
  shortDescription:
    "បន្ទះ ESP32 ជំនាន់ចុងក្រោយដែលមានសមត្ថភាពខ្ពស់ក្នុងការតភ្ជាប់ WiFi និង Bluetooth សម្រាប់គម្រោង IoT របស់អ្នក។",
  longDescription:
    "ESP32-WROOM-32D គឺជាម៉ូឌុល Wi-Fi + BT + BLE MCU ដ៏មានឥទ្ធិពលដែលកំណត់គោលដៅលើកម្មវិធីជាច្រើន ចាប់ពីបណ្តាញឧបករណ៍ចាប់សញ្ញាថាមពលទាប រហូតដល់កិច្ចការដែលទាមទារបំផុត ដូចជាការអ៊ិនកូដសំឡេង ការចាក់តន្ត្រី និងការឌិកូដ MP3 ជាដើម។",
  images: [
    "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&auto=format",
    "https://images.unsplash.com/photo-1591799264318-7e698ddb7c1d?w=800&auto=format",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format",
    "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800&auto=format",
  ],
  specs: {
    MCU: "ESP32-D0WD",
    Cores: "Dual Core 240MHz",
    Flash: "4MB",
    RAM: "520KB SRAM",
    WiFi: "802.11 b/g/n",
    Bluetooth: "v4.2 BR/EDR and BLE",
  },
};

const activeImage = ref(product.images[0]);
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
