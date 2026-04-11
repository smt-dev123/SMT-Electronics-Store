<template>
  <div class="bg-white dark:bg-zinc-950 min-h-screen">
    <div class="container mx-auto px-4 md:px-12 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <div class="lg:col-span-6 space-y-6">
          <div
            class="aspect-square bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-16 flex items-center justify-center relative group"
          >
            <div class="absolute top-6 left-6 flex flex-col gap-2">
              <span
                class="text-[9px] font-black bg-zinc-900 text-white dark:bg-white dark:text-black px-2 py-1 uppercase tracking-tighter"
                >Original Component</span
              >
              <span
                class="text-[9px] font-black border border-zinc-200 dark:border-zinc-700 dark:text-zinc-400 px-2 py-1 uppercase tracking-tighter"
                >SKU: {{ component.sku }}</span
              >
            </div>
            <img
              :src="activeImage"
              class="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <div class="grid grid-cols-4 gap-4">
            <button
              v-for="(img, i) in component.images"
              :key="i"
              @click="activeImage = img"
              class="aspect-square border p-2 transition-all"
              :class="
                activeImage === img
                  ? 'border-blue-600 bg-blue-50/10'
                  : 'border-zinc-100 dark:border-zinc-800'
              "
            >
              <img :src="img" class="w-full h-full object-contain" />
            </button>
          </div>
        </div>

        <div class="lg:col-span-6">
          <div class="border-b dark:border-zinc-900 pb-8 mb-8">
            <h1
              class="text-3xl md:text-5xl font-black dark:text-white uppercase tracking-tighter mb-4 leading-none"
            >
              {{ component.name }}
            </h1>
            <p
              class="text-blue-600 font-bold text-sm uppercase tracking-widest"
            >
              {{ component.type }} / {{ component.package }}
            </p>
          </div>

          <div
            class="mb-10 bg-zinc-50 dark:bg-zinc-900/50 p-6 border border-zinc-100 dark:border-zinc-800"
          >
            <h3
              class="text-[10px] font-black uppercase tracking-[0.2em] mb-4 dark:text-zinc-400 text-zinc-500"
            >
              Bulk Pricing (តម្លៃតាមចំនួន)
            </h3>
            <div class="grid grid-cols-3 gap-4">
              <div
                v-for="price in bulkPrices"
                :key="price.qty"
                class="border-l-2 border-zinc-200 dark:border-zinc-700 pl-4"
              >
                <p class="text-[10px] text-zinc-400 uppercase tracking-tighter">
                  {{ price.qty }}+ Units
                </p>
                <p class="text-lg font-black dark:text-white">
                  ${{ price.price }}
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-8">
            <ul class="space-y-3">
              <li
                v-for="feature in component.features"
                :key="feature"
                class="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 italic"
              >
                <Icon
                  name="lucide:check-circle-2"
                  class="w-4 h-4 text-blue-600"
                />
                {{ feature }}
              </li>
            </ul>

            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <div
                class="flex border border-zinc-200 dark:border-zinc-800 w-full sm:w-40"
              >
                <button
                  @click="qty > 1 ? qty-- : null"
                  class="flex-1 h-14 flex items-center justify-center dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  -
                </button>
                <input
                  type="number"
                  v-model="qty"
                  class="w-16 h-14 text-center bg-transparent dark:text-white font-bold outline-none border-x border-zinc-200 dark:border-zinc-800"
                />
                <button
                  @click="qty++"
                  class="flex-1 h-14 flex items-center justify-center dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  +
                </button>
              </div>
              <button
                class="flex-[2] bg-blue-600 text-white font-black uppercase tracking-widest text-xs h-14 hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black transition-all flex items-center justify-center gap-3"
              >
                <Icon name="lucide:zap" class="w-4 h-4" /> ទិញឥឡូវនេះ
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-20">
        <div
          class="flex gap-12 border-b dark:border-zinc-900 overflow-x-auto no-scrollbar"
        >
          <button
            v-for="tab in [
              'Overview',
              'Technical Specs',
              'Applications',
              'Downloads',
            ]"
            :key="tab"
            @click="activeTab = tab"
            class="pb-6 text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap relative"
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

        <div class="py-12 max-w-5xl">
          <div
            v-if="activeTab === 'Overview'"
            class="prose prose-zinc dark:prose-invert max-w-none prose-p:font-light prose-p:leading-loose"
          >
            <p>{{ component.description }}</p>
          </div>

          <div
            v-if="activeTab === 'Technical Specs'"
            class="grid grid-cols-1 md:grid-cols-2 gap-x-12"
          >
            <div
              v-for="(val, key) in component.fullSpecs"
              :key="key"
              class="flex justify-between py-4 border-b dark:border-zinc-900 group"
            >
              <span
                class="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-blue-600 transition-colors"
                >{{ key }}</span
              >
              <span class="text-sm font-bold dark:text-white">{{ val }}</span>
            </div>
          </div>

          <div
            v-if="activeTab === 'Downloads'"
            class="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div
              v-for="file in component.files"
              :key="file.name"
              class="p-6 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between group hover:border-blue-600 transition-all"
            >
              <div class="flex items-center gap-4">
                <Icon
                  name="lucide:file-text"
                  class="w-8 h-8 text-zinc-300 group-hover:text-blue-600"
                />
                <div>
                  <p
                    class="text-[10px] font-black uppercase tracking-widest dark:text-white"
                  >
                    {{ file.name }}
                  </p>
                  <p class="text-[9px] text-zinc-400">{{ file.size }}</p>
                </div>
              </div>
              <button class="text-xs font-black text-blue-600 hover:underline">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const qty = ref(1);
const activeTab = ref("Overview");

const component = {
  name: "ATMEGA328P-PU Microcontroller",
  sku: "IC-AVR-328P-DIP",
  type: "8-Bit AVR Microcontroller",
  package: "DIP-28",
  description:
    "ATmega328P គឺជាបន្ទះឈីប Single-chip microcontroller កម្រិតខ្ពស់ដែលផលិតដោយ Atmel ក្នុងគ្រួសារ AVR ។ វាត្រូវបានគេប្រើប្រាស់យ៉ាងទូលំទូលាយបំផុតនៅក្នុងបន្ទះ Arduino Uno R3 ដោយសារតែវាមានប្រសិទ្ធភាពខ្ពស់ និងប្រើប្រាស់ថាមពលទាប។",
  images: [
    "https://images.unsplash.com/photo-1591799264318-7e698ddb7c1d?w=800&auto=format",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format",
    "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&auto=format",
  ],
  features: [
    "Flash Memory: 32 KB",
    "SRAM: 2 KB",
    "EEPROM: 1 KB",
    "Max Operating Frequency: 20 MHz",
    "Operating Voltage: 1.8V - 5.5V",
  ],
  bulkPrices: [
    { qty: 1, price: 3.5 },
    { qty: 10, price: 3.2 },
    { qty: 50, price: 2.85 },
  ],
  fullSpecs: {
    Architecture: "8-Bit AVR",
    "Pin Count": "28 Pins",
    "ADC Channels": "6 Channels (10-bit)",
    "PWM Channels": "6 Channels",
    "UART/SPI/I2C": "Supported",
    "Watchdog Timer": "Programmable",
    "Operating Temp": "-40°C to 85°C",
  },
  files: [
    { name: "Full Datasheet (PDF)", size: "1.2 MB" },
    { name: "Pinout Diagram", size: "450 KB" },
    { name: "Schematic Library", size: "12 KB" },
  ],
};

const activeImage = ref(component.images[0]);
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
