<template>
  <div class="bg-white dark:bg-zinc-950 min-h-screen">
    <section
      class="py-20 bg-zinc-50 dark:bg-zinc-900/30 border-b border-zinc-100 dark:border-zinc-800"
    >
      <div class="container mx-auto px-4">
        <h1
          class="text-4xl md:text-6xl font-black dark:text-white uppercase tracking-tighter mb-4"
        >
          ទំនាក់ទំនង <span class="text-blue-600">.</span>
        </h1>
        <p class="text-zinc-500 dark:text-zinc-400 max-w-xl font-light">
          មានសំណួរអំពីផលិតផល ឬចង់សហការលើគម្រោងបច្ចេកវិទ្យា?
          ក្រុមការងារយើងត្រៀមខ្លួនជាស្រេចដើម្បីជួយអ្នក។
        </p>
      </div>
    </section>

    <section class="container mx-auto px-4 py-20">
      <div class="flex flex-col lg:flex-row gap-16">
        <div class="lg:w-1/3 space-y-12">
          <div v-for="info in contactDetails" :key="info.title" class="group">
            <h3
              class="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-4 flex items-center gap-2"
            >
              <Icon :name="info.icon" class="w-4 h-4" /> {{ info.title }}
            </h3>
            <p class="text-xl font-bold dark:text-white mb-2">
              {{ info.value }}
            </p>
            <p class="text-sm text-zinc-500">{{ info.subValue }}</p>
          </div>

          <div class="pt-8 border-t border-zinc-100 dark:border-zinc-800">
            <h3
              class="text-xs font-black uppercase tracking-[0.2em] dark:text-white mb-6"
            >
              តាមដានយើងតាម
            </h3>
            <div class="flex gap-4">
              <a
                href="#"
                v-for="social in socials"
                :key="social"
                class="w-12 h-12 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-blue-600 hover:text-white transition-all"
              >
                <Icon :name="`lucide:${social}`" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div
          class="lg:w-2/3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 shadow-2xl"
        >
          <form
            @submit.prevent="handleSubmit"
            class="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div class="space-y-2">
              <label
                class="text-[10px] font-black uppercase tracking-widest dark:text-zinc-400"
                >ឈ្មោះពេញ *</label
              >
              <input
                type="text"
                placeholder="John Doe"
                class="w-full bg-zinc-50 dark:bg-zinc-900 border-none py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all dark:text-white"
              />
            </div>
            <div class="space-y-2">
              <label
                class="text-[10px] font-black uppercase tracking-widest dark:text-zinc-400"
                >អ៊ីមែល *</label
              >
              <input
                type="email"
                placeholder="example@mail.com"
                class="w-full bg-zinc-50 dark:bg-zinc-900 border-none py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all dark:text-white"
              />
            </div>
            <div class="md:col-span-2 space-y-2">
              <label
                class="text-[10px] font-black uppercase tracking-widest dark:text-zinc-400"
                >ប្រធានបទ</label
              >
              <input
                type="text"
                placeholder="តើអ្នកចង់សាកសួរអំពីអ្វី?"
                class="w-full bg-zinc-50 dark:bg-zinc-900 border-none py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all dark:text-white"
              />
            </div>
            <div class="md:col-span-2 space-y-2">
              <label
                class="text-[10px] font-black uppercase tracking-widest dark:text-zinc-400"
                >សាររបស់អ្នក *</label
              >
              <textarea
                rows="6"
                placeholder="សរសេរសាររបស់អ្នកនៅទីនេះ..."
                class="w-full bg-zinc-50 dark:bg-zinc-900 border-none py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all dark:text-white resize-none"
              ></textarea>
            </div>
            <div class="md:col-span-2 pt-4">
              <button
                class="w-full md:w-auto bg-blue-600 text-white px-12 py-4 font-black uppercase tracking-[0.2em] text-xs hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black transition-all flex items-center justify-center gap-3 group"
              >
                បញ្ជូនសារ
                <Icon
                  name="lucide:send"
                  class="w-4 h-4 group-hover:translate-x-2 transition-transform"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <section
      class="h-[450px] w-full grayscale contrast-125 hover:grayscale-0 transition-all duration-1000 overflow-hidden border-t border-zinc-200 dark:border-zinc-800"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125126.398516954!2d104.8324424750212!3d11.57331569026219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6d47%3A0xe18eb52ceef35227!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
        width="100%"
        height="100%"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </section>
  </div>
</template>

<script setup>
const contactDetails = [
  {
    title: "អាសយដ្ឋាន",
    value: "ភ្នំពេញ, ប្រទេសកម្ពុជា",
    subValue: "ផ្លូវលេខ ២៧១, សង្កាត់ទឹកល្អក់, ខណ្ឌទួលគោក",
    icon: "lucide:map-pin",
  },
  {
    title: "លេខទូរស័ព្ទ",
    value: "+855 12 345 678",
    subValue: "Telegram / WhatsApp រៀងរាល់ថ្ងៃ ៨ព្រឹក - ៨យប់",
    icon: "lucide:phone",
  },
  {
    title: "អ៊ីមែល",
    value: "info@techkh.com",
    subValue: "ផ្ញើសារមកយើងគ្រប់ពេល យើងនឹងតបវិញក្នុង ២៤ម៉ោង",
    icon: "lucide:mail",
  },
];

const socials = ["facebook", "instagram", "twitter", "linkedin"];

const handleSubmit = () => {
  alert("សាររបស់អ្នកត្រូវបានបញ្ជូន! សូមអរគុណ។");
};
</script>
