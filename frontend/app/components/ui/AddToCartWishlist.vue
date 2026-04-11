<script setup>
const activeDropdown = ref(null);

const toggleDropdown = (type) => {
  if (activeDropdown.value === type) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = type;
  }
};

const closeDropdown = () => {
  activeDropdown.value = null;
};

const cartItems = [
  {
    id: 1,
    name: "Pro Headphones",
    price: 299,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 150,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
  },
];
</script>

<template>
  <div class="flex items-center gap-2 relative">
    <div class="relative">
      <button
        @click="toggleDropdown('wishlist')"
        class="p-2 rounded-full relative transition-all"
        :class="
          activeDropdown === 'wishlist'
            ? 'bg-gray-100 dark:bg-zinc-800 text-red-500'
            : 'text-gray-600 dark:text-zinc-300'
        "
      >
        <IconHeart class="w-5 h-5" />
        <span
          class="absolute top-1 right-1 bg-red-500 text-[10px] text-white w-4 h-4 flex items-center justify-center rounded-full"
          >0</span
        >
      </button>

      <div
        v-if="activeDropdown === 'wishlist'"
        class="absolute right-0 mt-3 w-80 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-2xl z-50 p-5 rounded-sm animate-pop-in"
      >
        <div class="flex justify-between items-center mb-4 border-b pb-2">
          <h3
            class="text-xs font-black uppercase tracking-widest dark:text-white"
          >
            បញ្ជីប្រាថ្នា
          </h3>
          <button
            @click="closeDropdown"
            class="text-zinc-400 hover:text-black dark:hover:text-white"
          >
            <IconX class="w-4 h-4" />
          </button>
        </div>
        <p class="text-center py-6 text-zinc-400 text-xs italic">
          មិនទាន់មានទំនិញក្នុងបញ្ជីនៅឡើយ
        </p>
        <NuxtLink
          to="/wishlist"
          @click="closeDropdown"
          class="block text-center bg-zinc-900 text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all"
          >មើលបញ្ជីទាំងអស់</NuxtLink
        >
      </div>
    </div>

    <div class="relative">
      <button
        @click="toggleDropdown('cart')"
        class="p-2 rounded-full relative transition-all"
        :class="
          activeDropdown === 'cart'
            ? 'bg-gray-100 dark:bg-zinc-800 text-blue-600'
            : 'text-gray-600 dark:text-zinc-300'
        "
      >
        <IconShoppingBag class="w-5 h-5" />
        <span
          class="absolute top-1 right-1 bg-blue-600 text-[10px] text-white w-4 h-4 flex items-center justify-center rounded-full"
          >2</span
        >
      </button>

      <div
        v-if="activeDropdown === 'cart'"
        class="absolute right-0 mt-3 w-[310px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-2xl z-50 animate-pop-in rounded-sm overflow-hidden"
      >
        <div class="p-5">
          <div class="flex justify-between items-center mb-6 border-b pb-2">
            <h3
              class="text-xs font-black uppercase tracking-widest dark:text-white"
            >
              កន្ត្រកទំនិញរបស់អ្នក
            </h3>
            <button
              @click="closeDropdown"
              class="text-zinc-400 hover:text-black dark:hover:text-white"
            >
              <IconX class="w-4 h-4" />
            </button>
          </div>

          <div class="space-y-5 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex gap-4 items-center group"
            >
              <div class="w-14 h-18 bg-zinc-100 flex-shrink-0">
                <img :src="item.image" class="w-full h-full object-cover" />
              </div>
              <div class="flex-grow">
                <h4
                  class="text-[11px] font-black uppercase tracking-tight dark:text-white leading-tight mb-1"
                >
                  {{ item.name }}
                </h4>
                <p class="text-[10px] font-mono text-zinc-500">
                  1 x ${{ item.price }}
                </p>
              </div>
              <button
                class="text-zinc-300 hover:text-red-500 transition-colors"
              >
                <IconTrash class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="mt-8 pt-5 border-t border-zinc-100 dark:border-zinc-800">
            <div class="flex justify-between items-center mb-6">
              <span
                class="text-[10px] font-black uppercase tracking-widest text-zinc-400"
                >តម្លៃសរុប</span
              >
              <span class="font-mono font-bold text-lg dark:text-white"
                >$449.00</span
              >
            </div>
            <div class="flex flex-col gap-2">
              <NuxtLink
                to="/checkout"
                @click="closeDropdown"
                class="w-full text-center py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/10"
                >បន្តទៅការបង់ប្រាក់</NuxtLink
              >
              <NuxtLink
                to="/cart"
                @click="closeDropdown"
                class="w-full text-center py-3 text-[9px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
                >កែសម្រួលកន្ត្រក</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="activeDropdown"
      @click="closeDropdown"
      class="fixed inset-0 z-40 bg-black/5"
    ></div>
  </div>
</template>

<style scoped>
.animate-pop-in {
  animation: popIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e4e4e7;
  border-radius: 10px;
}
</style>
