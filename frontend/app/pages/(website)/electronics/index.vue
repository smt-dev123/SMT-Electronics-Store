<template>
  <div class="bg-white dark:bg-zinc-950 min-h-screen">
    <UiTitle title="គ្រឿងអេឡិចត្រូនិច" url="/electronics" />

    <div class="container mx-auto px-4 py-12">
      <div class="flex flex-col lg:flex-row gap-12">
        <aside class="w-full lg:w-72 flex-shrink-0 space-y-10">
          <div class="relative">
            <input
              type="text"
              placeholder="ស្វែងរកលេខកូដគ្រឿង..."
              class="w-full bg-zinc-100 dark:bg-zinc-900 border-none py-3 px-4 text-sm rounded focus:ring-2 focus:ring-blue-600 outline-none dark:text-white"
            />
            <IconSearch
              class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
            />
          </div>

          <div>
            <h3
              class="text-xs font-black uppercase tracking-[0.2em] mb-6 dark:text-white flex items-center gap-2"
            >
              <div class="w-2 h-2 bg-blue-600"></div>
              ប្រភេទគ្រឿង
            </h3>
            <div class="space-y-2">
              <button
                v-for="type in componentTypes"
                :key="type.name"
                class="w-full flex justify-between items-center py-2 px-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group"
              >
                <span
                  class="text-zinc-600 dark:text-zinc-400 group-hover:text-blue-600"
                  >{{ type.name }}</span
                >
                <span
                  class="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-400"
                  >{{ type.count }}</span
                >
              </button>
            </div>
          </div>

          <div>
            <h3
              class="text-xs font-black uppercase tracking-[0.2em] mb-6 dark:text-white flex items-center gap-2"
            >
              <div class="w-2 h-2 bg-blue-600"></div>
              ស្ថានភាពស្តុក
            </h3>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  class="w-4 h-4 accent-blue-600"
                  checked
                />
                <span
                  class="text-sm dark:text-zinc-400 group-hover:text-blue-600"
                  >មានក្នុងស្តុក (In Stock)</span
                >
              </label>
              <label
                class="flex items-center gap-3 cursor-pointer group opacity-50"
              >
                <input type="checkbox" class="w-4 h-4 accent-blue-600" />
                <span class="text-sm dark:text-zinc-400"
                  >កម្ម៉ង់ទុកមុន (Pre-order)</span
                >
              </label>
            </div>
          </div>
        </aside>

        <main class="flex-1">
          <div
            class="flex justify-between items-center mb-10 pb-4 border-b dark:border-zinc-800"
          >
            <div class="flex items-center gap-4">
              <button
                class="p-2 bg-zinc-900 text-white dark:bg-white dark:text-black"
              >
                <IconLayoutGrid class="w-4 h-4" />
              </button>
              <button class="p-2 text-zinc-400 hover:text-blue-600">
                <IconList class="w-4 h-4" />
              </button>
            </div>
            <select
              class="bg-transparent text-xs font-black uppercase tracking-widest outline-none dark:text-white cursor-pointer"
            >
              <option>Default Sorting</option>
              <option>Price: Low to High</option>
              <option>Newest First</option>
            </select>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <div
              v-for="item in electronics"
              :key="item.id"
              class="group border p-4 border-gray-200 dark:border-zinc-800 relative rounded overflow-hidden bg-white dark:bg-zinc-900 transition-all hover:shadow-xl"
            >
              <div class="flex justify-between items-start mb-6">
                <span
                  class="text-[9px] font-bold px-2 py-0.5 border border-zinc-200 dark:border-zinc-800 dark:text-zinc-500 uppercase"
                >
                  SKU: {{ item.sku }}
                </span>
                <span
                  v-if="item.isNew"
                  class="text-[9px] font-bold text-blue-600 animate-pulse"
                  >● NEW</span
                >
              </div>

              <div
                class="aspect-video mb-8 relative group-hover:-translate-y-2 transition-transform duration-500"
              >
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all"
                />
              </div>

              <div class="space-y-3">
                <h3
                  class="font-bold text-base dark:text-white leading-tight min-h-[3rem] group-hover:text-blue-600 transition"
                >
                  {{ item.name }}
                </h3>

                <div
                  class="grid grid-cols-2 gap-y-2 py-4 border-t border-zinc-50 dark:border-zinc-900"
                >
                  <div v-for="(val, label) in item.specs" :key="label">
                    <p
                      class="text-[9px] text-zinc-400 uppercase tracking-tighter"
                    >
                      {{ label }}
                    </p>
                    <p class="text-[11px] font-bold dark:text-zinc-200">
                      {{ val }}
                    </p>
                  </div>
                </div>

                <div
                  class="flex items-center justify-between pt-4 border-t border-zinc-50 dark:border-zinc-900"
                >
                  <div class="flex flex-col">
                    <span class="text-xs text-zinc-400 font-mono italic"
                      >Unit Price</span
                    >
                    <span class="text-xl font-black text-blue-600"
                      >${{ item.price.toFixed(2) }}</span
                    >
                  </div>
                  <button
                    class="bg-zinc-100 dark:bg-zinc-900 hover:bg-blue-600 hover:text-white p-3 rounded transition-colors group/btn"
                  >
                    <IconPlus class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            class="mt-12 flex items-center justify-between border-t dark:border-zinc-800 pt-8"
          >
            <button
              class="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600 flex items-center gap-2 transition"
            >
              <IconChevronLeft class="w-4 h-4" /> Previous
            </button>
            <div class="flex gap-4">
              <span
                class="text-sm font-black text-blue-600 underline underline-offset-8"
                >01</span
              >
              <span
                class="text-sm font-black text-zinc-400 hover:text-blue-600 cursor-pointer transition"
                >02</span
              >
              <span
                class="text-sm font-black text-zinc-400 hover:text-blue-600 cursor-pointer transition"
                >03</span
              >
            </div>
            <button
              class="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600 flex items-center gap-2 transition"
            >
              Next <IconChevronRight class="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
const componentTypes = [
  { name: "Resistors", count: 120 },
  { name: "Capacitors", count: 85 },
  { name: "Transistors", count: 42 },
  { name: "Integrated Circuits", count: 64 },
  { name: "Diodes", count: 38 },
  { name: "Connectors", count: 110 },
];

const electronics = [
  {
    id: 1,
    sku: "IC-74HC595",
    name: "74HC595 Shift Register 8-Bit with 3-State Output",
    price: 0.45,
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&auto=format",
    specs: { Voltage: "2V - 6V", Package: "DIP-16", Type: "Logic IC" },
  },
  {
    id: 2,
    sku: "TR-2N2222",
    name: "2N2222 NPN Bipolar Junction Transistor",
    price: 0.15,
    isNew: false,
    image:
      "https://res.cloudinary.com/rs-designspark-live/image/upload/c_limit,w_600/f_auto/v1/article/1975-1_4245f986d53258d45565b72010f9f7869775c6c0",
    specs: { Current: "600mA", Voltage: "40V", Package: "TO-92" },
  },
  {
    id: 3,
    sku: "CP-100UF-25V",
    name: "100uF 25V Electrolytic Capacitor Low ESR",
    price: 0.1,
    isNew: false,
    image: "https://images.altronics.com.au/prod_new/r/R9412.jpg",
    specs: { Capacitance: "100uF", Temp: "105°C", Life: "2000h" },
  },
];
</script>
