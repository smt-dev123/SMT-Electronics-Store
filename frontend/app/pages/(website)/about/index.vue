<template>
  <div class="bg-white dark:bg-zinc-950 min-h-screen">
    <section
      class="relative py-20 md:py-32 overflow-hidden border-b border-zinc-100 dark:border-zinc-800"
    >
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl">
          <span
            class="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block"
            >Since 2020</span
          >
          <h1
            class="text-5xl md:text-7xl font-black dark:text-white uppercase tracking-tighter mb-8 leading-[0.9]"
          >
            យើងជួយអ្នក <br />
            <span class="text-zinc-400">បង្កើតអនាគត</span>
          </h1>
          <p
            class="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10 font-light"
          >
            TECHKH គឺជាមជ្ឈមណ្ឌលចែកចាយគ្រឿងបន្លាស់អេឡិចត្រូនិច និងដំណោះស្រាយ IoT
            ឈានមុខគេនៅកម្ពុជា។ យើងមិនត្រឹមតែលក់ផលិតផលប៉ុណ្ណោះទេ
            ប៉ុន្តែយើងផ្តល់នូវចំណេះដឹង និងការគាំទ្រដល់អ្នកបង្កើតថ្មីគ្រប់រូប។
          </p>
        </div>
      </div>
      <div
        class="absolute top-0 right-0 w-1/3 h-full bg-zinc-50 dark:bg-zinc-900/50 -skew-x-12 translate-x-1/2"
      ></div>
    </section>

    <section class="py-12 bg-zinc-950 text-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center md:text-left"
          >
            <p class="text-4xl font-black text-blue-600 mb-1">
              {{ stat.value }}
            </p>
            <p
              class="text-[10px] uppercase tracking-widest text-zinc-500 font-bold"
            >
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-24">
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800"
      >
        <div
          v-for="value in values"
          :key="value.title"
          class="bg-white dark:bg-zinc-950 p-12 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group"
        >
          <Icon
            :name="value.icon"
            class="w-12 h-12 text-blue-600 mb-8 group-hover:scale-110 transition-transform"
          />
          <h3 class="text-xl font-black dark:text-white uppercase mb-4">
            {{ value.title }}
          </h3>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {{ value.desc }}
          </p>
        </div>
      </div>
    </section>

    <section
      class="bg-zinc-50 dark:bg-zinc-900/30 py-24 border-t border-zinc-100 dark:border-zinc-800"
    >
      <div class="container mx-auto px-4">
        <div
          class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <h2
              class="text-3xl font-black dark:text-white uppercase tracking-tighter"
            >
              ក្រុមការងារយើង
            </h2>
            <div class="h-1 w-20 bg-blue-600 mt-2"></div>
          </div>
          <p class="max-w-md text-sm text-zinc-500">
            ប្រមូលផ្តុំដោយវិស្វករ
            និងអ្នកជំនាញបច្ចេកវិទ្យាដែលមានចំណងចំណូលចិត្តខ្ពស់ក្នុងការចែករំលែក។
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="member in team" :key="member.name" class="group">
            <div
              class="aspect-[3/4] overflow-hidden bg-zinc-200 dark:bg-zinc-800 mb-6 grayscale group-hover:grayscale-0 transition-all duration-500"
            >
              <img
                :src="member.image"
                :alt="member.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <h4
              class="font-black dark:text-white uppercase text-lg leading-none mb-2"
            >
              {{ member.name }}
            </h4>
            <p
              class="text-xs text-blue-600 font-bold uppercase tracking-widest"
            >
              {{ member.role }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-24 text-center">
      <h2
        class="text-4xl md:text-6xl font-black dark:text-white uppercase tracking-tighter mb-8"
      >
        ចង់សហការជាមួយយើង?
      </h2>
      <NuxtLink
        to="/contact"
        class="inline-block bg-blue-600 text-white px-12 py-5 font-black uppercase tracking-widest hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black transition-all"
      >
        ផ្ញើសារមកកាន់យើង
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
const stats = [
  { value: "5K+", label: "Products" },
  { value: "12K+", label: "Customers" },
  { value: "20+", label: "Partners" },
  { value: "24/7", label: "Support" },
];

const values = [
  {
    title: "Quality First",
    icon: "lucide:shield-check",
    desc: "រាល់គ្រឿងបន្លាស់ទាំងអស់ត្រូវបានត្រួតពិនិត្យគុណភាពយ៉ាងម៉ត់ចត់មុននឹងបញ្ជូនទៅកាន់ដៃអតិថិជន។",
  },
  {
    title: "Innovation",
    icon: "lucide:lightbulb",
    desc: "យើងតែងតែនាំយកបច្ចេកវិទ្យាថ្មីៗ និងដំណោះស្រាយ IoT ចុងក្រោយបង្អស់មកកាន់ទីផ្សារកម្ពុជា។",
  },
  {
    title: "Community",
    icon: "lucide:users",
    desc: "គាំទ្រសិស្ស និស្សិត និងអ្នកសិក្សាស្រាវជ្រាវតាមរយៈការផ្ដល់សម្ភារៈ និងចំណេះដឹងបច្ចេកទេស។",
  },
];

const team = [
  {
    name: "Sok Dara",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
  },
  {
    name: "Chan Ty",
    role: "Hardware Engineer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
  },
  {
    name: "Keo Rotha",
    role: "IoT Specialist",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
  },
  {
    name: "Leng Somnang",
    role: "Customer Success",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop",
  },
];
</script>
