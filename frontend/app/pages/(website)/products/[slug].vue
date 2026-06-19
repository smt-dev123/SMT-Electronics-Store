<script setup lang="ts">
import type { ProductType } from "~/types";

const qty = ref(1);
const activeTab = ref("Description");
const activeImage = ref<string | undefined>("");

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data: product, refresh } = await useAPI<ProductType>(
  `/products/${slug.value}`,
);

// watch(slug, () => {
//   refresh();
// });

watch(
  product,
  (newVal) => {
    if (newVal?.images?.length) {
      activeImage.value = newVal.images[0];
    }
  },
  { immediate: true },
);

// Parse the specifications string into an object
const parsedSpecs = computed(() => {
  if (!product.value?.specifications) return {};

  if (typeof product.value.specifications === "object") {
    return product.value.specifications;
  }

  try {
    return JSON.parse(product.value.specifications);
  } catch (e) {
    console.error("Failed to parse specifications:", e);
    return {};
  }
});

useSeoMeta({
  title: product.value?.name,
  description: product.value?.description,
});
</script>

<template>
  <div v-if="product" class="bg-white dark:bg-zinc-950 min-h-screen pb-20">
    <div class="container mx-auto px-4 md:px-12 py-10">
      <nav
        class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-10"
      >
        <NuxtLink to="/products" class="hover:text-blue-600">Products</NuxtLink>
        <Icon name="lucide:chevron-right" class="w-3 h-3" />
        <span class="text-zinc-900 dark:text-zinc-200">
          {{ product?.brand?.name || "Product Details" }}
        </span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div class="lg:col-span-7 space-y-4">
          <div
            class="aspect-square bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-12 flex items-center justify-center overflow-hidden"
          >
            <img
              v-if="activeImage"
              :src="activeImage"
              :alt="product.name"
              class="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
            />
          </div>

          <div v-if="product.images?.length" class="grid grid-cols-5 gap-4">
            <button
              v-for="(img, index) in product.images"
              :key="index"
              @click="activeImage = img"
              class="aspect-square border-2 p-2 transition-all overflow-hidden"
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
            >
              {{ product?.brand?.name }}
            </span>
            <h1
              class="text-3xl md:text-5xl font-black dark:text-white uppercase tracking-tighter leading-tight mb-6"
            >
              {{ product?.name }}
            </h1>
            <div class="flex items-center gap-4">
              <span class="text-3xl font-black text-zinc-950 dark:text-white">
                ${{ product?.price }}
              </span>
              <span
                v-if="product?.discount !== 0"
                class="bg-red-500 text-white text-[10px] font-black px-2 py-1 uppercase"
                >{{ product?.discount }} OFF</span
              >
            </div>
          </div>

          <div class="space-y-8">
            <p
              class="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-light"
            >
              {{ product?.description }}
            </p>

            <div class="flex items-center gap-2">
              <div
                class="w-2 h-2 rounded-full bg-green-500 animate-pulse"
              ></div>
              <span
                class="text-[10px] font-black uppercase tracking-widest dark:text-zinc-300"
              >
                មានក្នុងស្តុក (In Stock: {{ product?.stockQty }} units)
              </span>
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
              {{ product?.description }}
            </p>
          </div>

          <div v-if="activeTab === 'Specifications'" class="space-y-4">
            <div
              v-for="(val, key) in parsedSpecs"
              :key="key"
              class="flex border-b border-zinc-50 dark:border-zinc-900 py-4"
            >
              <span
                class="w-48 text-[10px] font-black uppercase tracking-widest text-zinc-400"
              >
                {{ key }}
              </span>
              <span class="text-sm font-bold dark:text-white">
                {{ val }}
              </span>
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
              {{ product.name.replace(/\s+/g, "_") }}_Datasheet.pdf
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

  <div v-else class="min-h-screen flex items-center justify-center">
    <span class="text-zinc-500 animate-pulse">Loading product...</span>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
