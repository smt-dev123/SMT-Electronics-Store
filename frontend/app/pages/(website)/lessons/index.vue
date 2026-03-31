<template>
  <div class="bg-white dark:bg-zinc-950 min-h-screen">
    <section class="py-20 border-b border-zinc-100 dark:border-zinc-800">
      <div class="container mx-auto px-4 text-center">
        <span
          class="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block"
          >Knowledge Base</span
        >
        <h1
          class="text-4xl md:text-6xl font-black dark:text-white uppercase tracking-tighter mb-6"
        >
          មេរៀនបច្ចេកវិទ្យា <span class="text-blue-600">.</span>
        </h1>
        <p
          class="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed"
        >
          ស្វែងយល់ពីមូលដ្ឋានគ្រឹះនៃអេឡិចត្រូនិច ការសរសេរកូដ Arduino
          និងការបង្កើតគម្រោង IoT ពីកម្រិតដំបូងរហូតដល់កម្រិតអាជីព។
        </p>
      </div>
    </section>

    <section
      class="sticky top-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800"
    >
      <div
        class="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-6"
      >
        <div
          class="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar"
        >
          <button
            v-for="cat in lessonCats"
            :key="cat"
            class="px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap"
            :class="
              cat === 'ទាំងអស់'
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800'
            "
          >
            {{ cat }}
          </button>
        </div>
        <div class="relative w-full md:w-64">
          <input
            type="text"
            placeholder="ស្វែងរកមេរៀន..."
            class="w-full bg-zinc-100 dark:bg-zinc-900 border-none py-2 px-4 text-xs outline-none focus:ring-1 focus:ring-blue-600 dark:text-white"
          />
          <IconSearch
            class="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400"
          />
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardArticle
          v-for="lesson in lessons"
          :key="lesson.slug"
          v-bind="lesson"
          :name="lesson.title"
          :slug="lesson.slug"
          :category="lesson.category"
          :date="lesson.date"
          :excerpt="lesson.excerpt"
          :author="lesson.author"
          :authorImage="lesson.authorImage"
          :image="lesson.image"
        />
      </div>

      <div class="mt-20 text-center">
        <button
          class="border-2 border-zinc-900 dark:border-white px-10 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
        >
          មើលបន្ថែមទៀត
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import CardArticle from "~/components/ui/Card/CardArticle.vue";

const lessonCats = [
  "ទាំងអស់",
  "Arduino",
  "IoT",
  "Robotics",
  "Electronic Basics",
  "Python",
];

const lessons = [
  {
    slug: "introduction-to-arduino",
    level: "Beginner",
    category: "Arduino",
    date: "March 15, 2024",
    title: "មូលដ្ឋានគ្រឹះនៃការប្រើប្រាស់ Arduino Uno សម្រាប់អ្នកទើបចាប់ផ្តើម",
    excerpt:
      "នៅក្នុងអត្ថបទនេះ យើងនឹងស្វែងយល់អំពីគ្រឿងបំណែកនីមួយៗដែលមាននៅលើបន្ទះ Arduino Uno និងរបៀបសរសេរកូដដំបូងបង្អស់ដើម្បីបញ្ជាអំពូល LED។",
    author: "Sok Dara",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    image:
      "https://images.unsplash.com/photo-1603738153161-420286827056?q=80&w=800&auto=format",
  },
  {
    slug: "weather-station-with-esp32",
    level: "Advanced",
    category: "IoT",
    date: "March 10, 2024",
    title: "ការបង្កើត Weather Station ជាមួយ ESP32 និង MQTT Protocol",
    excerpt:
      "រៀនពីរបៀបផ្ញើទិន្នន័យសីតុណ្ហភាព និងសំណើមទៅកាន់ Cloud Dashboard ក្នុងពេលជាក់ស្តែង (Real-time) ដោយប្រើប្រាស់បន្ទះ ESP32 និង MQTT។",
    author: "Keo Rotha",
    authorImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    image:
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800&auto=format",
  },
  {
    slug: "servo-motor-ultrasonic-sensor",
    level: "Intermediate",
    category: "Robotics",
    date: "March 05, 2024",
    title: "របៀបដំឡើង និងបញ្ជា Servo Motor ជាមួយ Ultrasonic Sensor",
    excerpt:
      "មេរៀននេះនឹងបង្ហាញអ្នកពីរបៀបបង្កើតប្រព័ន្ធបើកទ្វារដោយស្វ័យប្រវត្តិ នៅពេលដែលវាចាប់បានវត្តមានមនុស្សនៅខាងមុខ។",
    author: "Chan Ty",
    authorImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format",
  },
];
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
