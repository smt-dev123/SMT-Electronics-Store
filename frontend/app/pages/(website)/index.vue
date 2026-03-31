<template>
  <main class="bg-white dark:bg-zinc-950 min-h-screen">
    <section
      class="relative h-[450px] md:h-[600px] w-full overflow-hidden bg-zinc-950"
    >
      <div
        v-for="(slide, index) in heroSlides"
        :key="index"
        v-show="currentSlide === index"
        class="absolute inset-0 transition-all duration-1000 ease-in-out transform"
        :class="
          currentSlide === index
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-105'
        "
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent z-10"
        ></div>
        <img
          :src="slide.image"
          :alt="slide.title"
          class="w-full h-full object-cover opacity-60 absolute inset-0"
        />

        <div
          class="container mx-auto px-4 relative h-full flex flex-col justify-center items-start z-50"
        >
          <div class="overflow-hidden mb-4">
            <span
              class="inline-block bg-blue-600 text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-[0.2em] text-white animate-slide-up"
            >
              {{ slide.badge }}
            </span>
          </div>
          <h1
            class="text-4xl md:text-7xl font-black mb-6 leading-tight uppercase text-white"
            v-html="slide.title"
          ></h1>
          <p
            class="text-zinc-300 max-w-lg mb-10 text-sm md:text-lg leading-relaxed font-light"
          >
            {{ slide.description }}
          </p>
          <NuxtLink
            :to="slide.link"
            class="group relative bg-white text-black hover:text-white px-10 py-4 rounded font-bold transition-all duration-300 text-xs uppercase tracking-widest overflow-hidden"
          >
            <span class="relative z-10">ទិញឥឡូវនេះ</span>
            <div
              class="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            ></div>
          </NuxtLink>
        </div>
      </div>

      <div class="absolute bottom-8 left-4 md:left-12 flex gap-3 z-30">
        <button
          v-for="(_, index) in heroSlides"
          :key="index"
          @click="currentSlide = index"
          class="h-1 transition-all duration-500 rounded-full"
          :class="
            currentSlide === index
              ? 'w-12 bg-blue-600'
              : 'w-6 bg-white/30 hover:bg-white/50'
          "
        ></button>
      </div>
    </section>

    <section
      class="bg-gray-50 dark:bg-zinc-900/50 py-16 border-t border-gray-100 dark:border-zinc-800"
    >
      <div class="container mx-auto px-4">
        <h3
          class="text-center text-gray-500 dark:text-zinc-600 text-2xl font-bold uppercase tracking-widest mb-10"
        >
          ស្វែងរកតាមប្រភេទទូទៅ
        </h3>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <UiCardName
            v-for="(category, index) in categories"
            :key="index"
            :name="category.name"
            :icon="category.icon"
          />
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-end mb-10">
        <div>
          <h2 class="text-2xl font-bold dark:text-white mb-2 text-uppercase">
            ផលិតផលថ្មីៗ
          </h2>
          <div class="h-1 w-12 bg-blue-600"></div>
        </div>
        <NuxtLink
          to="/products"
          class="text-sm font-bold text-blue-600 hover:underline"
          >មើលទាំងអស់</NuxtLink
        >
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <UiCard
          v-for="product in products"
          :key="product.id"
          :name="product.name"
          :slug="product.slug"
          :category="product.category"
          :price="product.price"
          :oldPrice="product.oldPrice"
          :discount="product.discount"
          :image="product.image"
        />
      </div>
    </section>

    <section class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-end mb-10">
        <div>
          <h2 class="text-2xl font-bold dark:text-white mb-2 text-uppercase">
            ផលិតពេញនិយម
          </h2>
          <div class="h-1 w-12 bg-blue-600"></div>
        </div>
        <NuxtLink
          to="/products"
          class="text-sm font-bold text-blue-600 hover:underline"
          >មើលទាំងអស់</NuxtLink
        >
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <UiCard
          v-for="product in products"
          :key="product.id"
          :name="product.name"
          :slug="product.slug"
          :category="product.category"
          :price="product.price"
          :oldPrice="product.oldPrice"
          :discount="product.discount"
          :image="product.image"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
const currentSlide = ref(0);
let slideInterval = null;

const startSlide = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % heroSlides.length;
  }, 5000);
};

onMounted(() => startSlide());
onUnmounted(() => clearInterval(slideInterval));

const heroSlides = [
  {
    badge: "ថ្មីមកដល់",
    title:
      'បច្ចេកវិទ្យា <span class="text-blue-600">IoT</span><br/>សម្រាប់អនាគតឆ្លាតវៃ',
    description:
      "ស្វែងរកគ្រឿងបន្លាស់អេឡិចត្រូនិច និងសេនស័រគ្រប់ប្រភេទ សម្រាប់គម្រោង Arduino និង Robotics របស់អ្នក ជាមួយតម្លៃសមរម្យ និងគុណភាពខ្ពស់។",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    link: "#",
  },
  {
    badge: "គុណភាពខ្ពស់",
    title:
      'គ្រឿងបន្លាស់ <span class="text-blue-600">Arduino</span><br/>ជំនាន់ថ្មី',
    description:
      "នាំចូលផ្ទាល់ពីរោងចក្រ មានគុណភាពខ្ពស់ ប្រើបានយូរ និងមានភាពច្បាស់លាស់ សមស្របសម្រាប់អ្នករៀន និងអ្នកជំនាញ។",
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76",
    link: "#",
  },
];

const categories = [
  { name: "Arduino", icon: "lucide:cpu" },
  { name: "Sensors", icon: "lucide:thermometer" },
  { name: "IoT", icon: "lucide:wifi" },
  { name: "Motors", icon: "lucide:cog" },
  { name: "Power", icon: "lucide:battery-charging" },
  { name: "Tools", icon: "lucide:wrench" },
];

const products = [
  {
    id: 1,
    name: "Arduino Uno R3 Original (Made in Italy)",
    slug: "arduino-uno-r3-original",
    category: "Microcontroller",
    price: 22.0,
    oldPrice: 25.0,
    discount: 10,
    image:
      "https://cdn.webshopapp.com/shops/346407/files/437661063/otronic-starter-kit-for-arduino-uno-r3-with-096-in.jpg",
  },
  {
    id: 2,
    name: "ESP32-DevKitC-32D Development Board WiFi+BT",
    slug: "esp32-devkitc-32d",
    category: "IoT Modules",
    price: 8.5,
    image:
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "HC-SR04 Ultrasonic Distance Sensor Module",
    slug: "hc-sr04-ultrasonic-sensor",
    category: "Sensors",
    price: 1.2,
    oldPrice: 1.5,
    discount: 20,
    image:
      "https://europe1.discourse-cdn.com/arduino/original/4X/d/a/c/daca63ee95704fbeb0e0a06407a3bef4dc3022e8.jpeg  ",
  },
  {
    id: 4,
    name: "SG90 Micro Servo Motor 9g for Rc Robot",
    slug: "sg90-micro-servo-motor",
    category: "Motors",
    price: 2.1,
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "5V 2A Power Adapter for Arduino Projects",
    slug: "5v-2a-power-adapter",
    category: "Power",
    price: 3.0,
    oldPrice: 4.0,
    discount: 25,
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Multimeter Digital Voltmeter Ammeter Ohmmeter",
    slug: "multimeter-digital-voltmeter",
    category: "Tools",
    price: 15.0,
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
  },
];
</script>

<style scoped>
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
}
</style>
