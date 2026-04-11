<script setup>
// ឧទាហរណ៍ទិន្នន័យក្នុងកន្ត្រក
const cartItems = ref([
  {
    id: 1,
    name: "Wireless Headphones Pro",
    color: "Space Gray",
    size: "One Size",
    price: 299.0,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
  },
  {
    id: 3,
    name: "Mechanical Keyboard RGB",
    color: "Black",
    size: "Full Size",
    price: 120.0,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000",
  },
]);

const subtotal = computed(() => {
  return cartItems.value.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
});

const shipping = ref(10.0);
const total = computed(() => subtotal.value + shipping.value);

const updateQuantity = (id, delta) => {
  const item = cartItems.value.find((i) => i.id === id);
  if (item) {
    const newQty = item.quantity + delta;
    if (newQty > 0) item.quantity = newQty;
  }
};

const removeItem = (id) => {
  cartItems.value = cartItems.value.filter((i) => i.id !== id);
};
</script>

<template>
  <div class="min-h-screen bg-white py-12 md:py-24">
    <div class="container mx-auto px-4 md:px-12">
      <h1
        class="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 border-b border-zinc-100 pb-8"
      >
        កន្ត្រកទំនិញ <span class="text-blue-600">[{{ cartItems.length }}]</span>
      </h1>

      <div v-if="cartItems.length > 0" class="flex flex-col lg:flex-row gap-16">
        <div class="flex-grow space-y-8">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex gap-6 pb-8 border-b border-zinc-50 group"
          >
            <div
              class="w-24 h-32 md:w-40 md:h-52 bg-zinc-100 overflow-hidden flex-shrink-0"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div class="flex flex-col justify-between flex-grow">
              <div class="flex justify-between items-start">
                <div>
                  <h3
                    class="text-lg md:text-xl font-bold uppercase tracking-tight text-zinc-950"
                  >
                    {{ item.name }}
                  </h3>
                  <p
                    class="text-sm text-zinc-500 mt-1 uppercase tracking-widest font-light"
                  >
                    {{ item.color }} / {{ item.size }}
                  </p>
                </div>
                <button
                  @click="removeItem(item.id)"
                  class="text-zinc-400 hover:text-red-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div class="flex justify-between items-end mt-4">
                <div
                  class="flex items-center border border-zinc-200 rounded-sm"
                >
                  <button
                    @click="updateQuantity(item.id, -1)"
                    class="px-3 py-1 hover:bg-zinc-50 text-zinc-500"
                  >
                    -
                  </button>
                  <span
                    class="px-4 py-1 font-mono text-sm border-x border-zinc-100"
                    >{{ item.quantity }}</span
                  >
                  <button
                    @click="updateQuantity(item.id, 1)"
                    class="px-3 py-1 hover:bg-zinc-50 text-zinc-500"
                  >
                    +
                  </button>
                </div>
                <p class="font-mono font-bold text-lg text-zinc-950">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-[400px]">
          <div class="bg-zinc-50 p-8 sticky top-24">
            <h2
              class="text-xl font-black uppercase tracking-widest mb-8 border-b border-zinc-200 pb-4"
            >
              សេចក្តីសង្ខេប
            </h2>

            <div class="space-y-4 font-medium uppercase text-sm tracking-tight">
              <div class="flex justify-between text-zinc-500">
                <span>សរុបទំនិញ</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-zinc-500">
                <span>ថ្លៃដឹកជញ្ជូន</span>
                <span>${{ shipping.toFixed(2) }}</span>
              </div>
              <div
                class="pt-4 border-t border-zinc-200 flex justify-between text-xl font-black text-zinc-950"
              >
                <span>សរុបរួម</span>
                <span>${{ total.toFixed(2) }}</span>
              </div>
            </div>

            <div class="mt-8">
              <input
                type="text"
                placeholder="លេខកូដបញ្ចុះតម្លៃ"
                class="w-full bg-transparent border-b border-zinc-300 py-2 focus:border-blue-600 outline-none text-sm uppercase font-bold transition-all"
              />
            </div>

            <NuxtLink
              to="/checkout"
              class="w-full bg-zinc-950 text-white font-black py-5 mt-10 uppercase text-xs tracking-[0.3em] hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
            >
              បន្តទៅការបង់ប្រាក់
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </NuxtLink>

            <div class="mt-8 flex justify-center gap-4 opacity-30 grayscale">
              <img
                src="https://www.svgrepo.com/show/354513/visa.svg"
                class="h-5"
              />
              <img
                src="https://www.svgrepo.com/show/354039/mastercard.svg"
                class="h-5"
              />
              <img
                src="https://www.svgrepo.com/show/354113/nextjs.svg"
                class="h-5"
                title="Dummy Pay"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="py-32 text-center border-2 border-dashed border-zinc-100 rounded-lg"
      >
        <h2 class="text-2xl font-black uppercase mb-4 text-zinc-300">
          កន្ត្រករបស់អ្នកទទេ
        </h2>
        <NuxtLink
          to="/shop"
          class="inline-block bg-zinc-950 text-white px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-blue-600 transition-all"
        >
          ទៅទិញទំនិញឥឡូវនេះ
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
