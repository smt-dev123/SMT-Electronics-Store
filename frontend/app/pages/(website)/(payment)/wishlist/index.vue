<script setup>
// ឧទាហរណ៍ទិន្នន័យផលិតផលក្នុង Wishlist
const wishlistItems = ref([
  {
    id: 1,
    name: "Wireless Headphones Pro",
    price: 299.0,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
    inStock: true,
  },
  {
    id: 2,
    name: "Minimalist Smart Watch",
    price: 150.0,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000",
    inStock: false,
  },
  {
    id: 3,
    name: "Mechanical Keyboard RGB",
    price: 120.0,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000",
    inStock: true,
  },
]);

const removeItem = (id) => {
  wishlistItems.value = wishlistItems.value.filter((item) => item.id !== id);
};

const addToCart = (item) => {
  console.log("Added to cart:", item.name);
  // បន្ថែម Logic ទៅកាន់ Cart Store នៅទីនេះ
};
</script>

<template>
  <div class="min-h-screen bg-white py-12 md:py-20">
    <div class="container mx-auto px-4 md:px-12">
      <div
        class="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-zinc-100 pb-8"
      >
        <div>
          <h1
            class="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-950"
          >
            បញ្ជីប្រាថ្នា
            <span class="text-blue-600">({{ wishlistItems.length }})</span>
          </h1>
          <p class="text-zinc-500 mt-2 font-light">
            រក្សាទុកផលិតផលដែលអ្នកស្រឡាញ់ ដើម្បីទិញនៅពេលក្រោយ។
          </p>
        </div>
        <NuxtLink
          to="/shop"
          class="mt-4 md:mt-0 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-blue-600 transition-colors"
        >
          បន្តការទិញទំនិញ &rarr;
        </NuxtLink>
      </div>

      <div v-if="wishlistItems.length === 0" class="py-20 text-center">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-zinc-50 rounded-full mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-zinc-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-zinc-950 mb-2">
          មិនទាន់មានទំនិញក្នុងបញ្ជី
        </h2>
        <p class="text-zinc-500 mb-8">
          ចាប់ផ្តើមរុករកទំនិញ និងចុចលើរូបបេះដូងដើម្បីរក្សាទុក។
        </p>
        <NuxtLink
          to="/shop"
          class="bg-zinc-950 text-white px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-blue-600 transition-all"
        >
          ទៅកាន់ហាងទំនិញ
        </NuxtLink>
      </div>

      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <div
          v-for="item in wishlistItems"
          :key="item.id"
          class="group relative bg-white border border-zinc-100 hover:shadow-2xl hover:shadow-zinc-200 transition-all duration-500"
        >
          <div class="relative aspect-[4/5] overflow-hidden bg-zinc-100">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <button
              @click="removeItem(item.id)"
              class="absolute top-4 right-4 p-2 bg-white/90 hover:bg-red-500 hover:text-white rounded-full shadow-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
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

            <div
              v-if="!item.inStock"
              class="absolute inset-0 bg-white/60 flex items-center justify-center"
            >
              <span
                class="bg-zinc-950 text-white text-[10px] font-bold px-3 py-1 uppercase"
                >ដាច់ស្តុក</span
              >
            </div>
          </div>

          <div class="p-6">
            <h3
              class="text-lg font-bold text-zinc-900 mb-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight"
            >
              {{ item.name }}
            </h3>
            <p class="text-zinc-500 font-mono mb-6">
              ${{ item.price.toFixed(2) }}
            </p>

            <button
              @click="addToCart(item)"
              :disabled="!item.inStock"
              class="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border border-zinc-900 group-hover:bg-zinc-950 group-hover:text-white disabled:border-zinc-200 disabled:text-zinc-300 disabled:cursor-not-allowed"
            >
              {{ item.inStock ? "ដាក់ចូលកន្ត្រក" : "មិនអាចទិញបាន" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
