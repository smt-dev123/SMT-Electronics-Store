<template>
  <div class="bg-white dark:bg-zinc-950 min-h-screen">
    <div
      class="fixed top-0 left-0 w-full h-1 z-[60] bg-zinc-100 dark:bg-zinc-900"
    >
      <div
        class="h-full bg-blue-600 transition-all duration-150"
        :style="{ width: readingProgress + '%' }"
      ></div>
    </div>

    <header
      class="py-16 md:py-24 border-b border-zinc-100 dark:border-zinc-900"
    >
      <div class="container mx-auto px-6 md:px-12">
        <div class="max-w-4xl">
          <nav
            class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6"
          >
            <NuxtLink to="/lessons" class="hover:underline">Lessons</NuxtLink>
            <Icon name="lucide:chevron-right" class="w-3 h-3 text-zinc-300" />
            <span class="text-zinc-400">{{ lesson.category }}</span>
          </nav>

          <h1
            class="text-4xl md:text-6xl font-black dark:text-white leading-[1.1] tracking-tighter mb-8"
          >
            {{ lesson.title }}
          </h1>

          <div
            class="flex flex-wrap items-center gap-6 pt-8 border-t border-zinc-100 dark:border-zinc-900"
          >
            <div class="flex items-center gap-3">
              <img
                :src="lesson.authorImage"
                class="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800"
              />
              <div>
                <p
                  class="text-[10px] font-black dark:text-white uppercase tracking-widest leading-none"
                >
                  {{ lesson.author }}
                </p>
                <p class="text-[9px] text-zinc-400 uppercase mt-1">
                  Technical Instructor
                </p>
              </div>
            </div>
            <div
              class="h-8 w-px bg-zinc-100 dark:bg-zinc-800 hidden md:block"
            ></div>
            <div
              class="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest"
            >
              <Icon name="lucide:calendar" class="w-4 h-4" />
              {{ lesson.date }}
            </div>
            <div
              class="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest"
            >
              <Icon name="lucide:clock" class="w-4 h-4" />
              ១៥ នាទីនៃការអាន
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-6 md:px-12 py-16">
      <div class="flex flex-col lg:flex-row gap-16">
        <article
          class="flex-1 max-w-none prose prose-zinc dark:prose-invert prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-lg prose-img:border prose-img:border-zinc-100 dark:prose-img:border-zinc-800"
        >
          <img
            :src="lesson.image"
            class="w-full aspect-video object-cover mb-12 shadow-2xl"
          />

          <h2>មូលដ្ឋានគ្រឹះ និងគោលបំណង</h2>
          <p>
            នៅក្នុងមេរៀននេះ យើងនឹងជជែកគ្នាអំពីរបៀបប្រើប្រាស់
            <strong>Arduino Uno</strong> ដើម្បីបង្កើតគម្រោងដំបូងបង្អស់របស់អ្នក។
            វាជាចំណុចចាប់ផ្ដើមដ៏ល្អបំផុតសម្រាប់អ្នកដែលចង់យល់ដឹងពីពិភពអេឡិចត្រូនិច។
          </p>

          <div
            class="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-600 p-8 my-10 font-bold italic text-blue-900 dark:text-blue-200"
          >
            "ចំណេះដឹងពិតប្រាកដ កើតចេញពីការសាកល្បង
            និងការខុសបច្ចេកទេសម្តងហើយម្តងទៀត។"
          </div>

          <h2>សម្ភារៈដែលត្រូវមាន (Bill of Materials)</h2>
          <ul>
            <li>Arduino Uno R3 x1</li>
            <li>USB 2.0 Cable Type A/B x1</li>
            <li>LED (ពណ៌អ្វីក៏បាន) x1</li>
            <li>Resistor 220 Ohm x1</li>
            <li>Breadboard & Jumper Wires</li>
          </ul>

          <h2>កូដគំរូ (Sample Code)</h2>
          <pre
            class="bg-zinc-900 text-zinc-100 p-6 overflow-x-auto border-l-4 border-blue-600 font-mono text-sm"
          >
void setup() {
  pinMode(13, OUTPUT); // កំណត់ជើងទី ១៣ ជា Output
}

void loop() {
  digitalWrite(13, HIGH); // បើកភ្លើង
  delay(1000);           // រង់ចាំ ១ វិនាទី
  digitalWrite(13, LOW);  // បិទភ្លើង
  delay(1000);           // រង់ចាំ ១ វិនាទី
}</pre
          >

          <h2>ការសន្និដ្ឋាន</h2>
          <p>
            បន្ទាប់ពីបញ្ចប់មេរៀននេះ
            អ្នកនឹងយល់ច្បាស់ពីរបៀបបញ្ចូលកូដទៅក្នុងមេបញ្ជាការ
            និងរបៀបបញ្ជាគ្រឿងអេឡិចត្រូនិចខាងក្រៅដោយប្រើកូដ។
          </p>
        </article>

        <aside class="w-full lg:w-80 space-y-12">
          <div
            class="sticky top-24 border border-zinc-100 dark:border-zinc-900 p-8 bg-zinc-50/50 dark:bg-zinc-900/20"
          >
            <h3
              class="text-xs font-black uppercase tracking-[0.2em] dark:text-white mb-6 border-b pb-4 dark:border-zinc-800"
            >
              មាតិកាមេរៀន
            </h3>
            <ul class="space-y-4">
              <li
                v-for="h in [
                  'មូលដ្ឋានគ្រឹះ',
                  'សម្ភារៈដែលត្រូវមាន',
                  'កូដគំរូ',
                  'ការសន្និដ្ឋាន',
                ]"
                :key="h"
              >
                <a
                  href="#"
                  class="text-sm font-bold text-zinc-500 hover:text-blue-600 transition-colors flex items-center gap-2 group"
                >
                  <div
                    class="w-1 h-1 bg-zinc-300 group-hover:bg-blue-600"
                  ></div>
                  {{ h }}
                </a>
              </li>
            </ul>

            <div class="mt-12 pt-12 border-t dark:border-zinc-800">
              <h4
                class="text-[10px] font-black uppercase tracking-widest dark:text-white mb-4"
              >
                ទទួលបានមេរៀនថ្មីៗ
              </h4>
              <input
                type="email"
                placeholder="Email Address"
                class="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 py-3 px-4 text-xs outline-none focus:border-blue-600 mb-2 dark:text-white"
              />
              <button
                class="w-full bg-zinc-950 dark:bg-white text-white dark:text-black py-3 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <section
      class="border-t border-zinc-100 dark:border-zinc-900 py-20 bg-zinc-50/50 dark:bg-zinc-900/10"
    >
      <div class="container mx-auto px-6 md:px-12">
        <div class="flex flex-col md:flex-row justify-between gap-8">
          <NuxtLink
            to="#"
            class="flex-1 group p-10 border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-blue-600 transition-all"
          >
            <p
              class="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4"
            >
              Previous Lesson
            </p>
            <h4
              class="text-xl font-black dark:text-white group-hover:text-blue-600 transition"
            >
              ការដំឡើង Arduino IDE លើ Windows
            </h4>
          </NuxtLink>
          <NuxtLink
            to="#"
            class="flex-1 group p-10 border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-blue-600 transition-all text-right"
          >
            <p
              class="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4"
            >
              Next Lesson
            </p>
            <h4
              class="text-xl font-black dark:text-white group-hover:text-blue-600 transition"
            >
              ការយល់ដឹងពី PWM និង Analog Output
            </h4>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const readingProgress = ref(0);

const updateProgress = () => {
  const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  readingProgress.value = (window.scrollY / totalHeight) * 100;
};

onMounted(() => window.addEventListener("scroll", updateProgress));
onUnmounted(() => window.removeEventListener("scroll", updateProgress));

const lesson = {
  title: "មូលដ្ឋានគ្រឹះនៃការប្រើប្រាស់ Arduino Uno សម្រាប់អ្នកទើបចាប់ផ្តើម",
  category: "Arduino",
  date: "March 25, 2024",
  author: "Sok Dara",
  authorImage:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  image:
    "https://images.unsplash.com/photo-1603738153161-420286827056?q=80&w=1200&auto=format",
};
</script>
