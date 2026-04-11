<template>
  <footer
    class="bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 pt-16 pb-8"
  >
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div class="space-y-4">
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <div class="bg-blue-600 p-1.5 rounded-lg">
              <IconCpu class="w-6 h-6 text-white" />
            </div>
            <span
              class="text-xl font-bold tracking-tight text-blue-600 group-hover:text-blue-700 transition"
            >
              SMT
              <span class="text-black dark:text-white">ELECTTRONICS-STORE</span>
            </span>
          </NuxtLink>
          <p class="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
            យើងគឺជាហាងលក់គ្រឿងអេឡិចត្រូនិច និងឧបករណ៍ IoT ឈានមុខគេនៅកម្ពុជា។
            ផ្ដល់ជូននូវគុណភាព និងទំនុកចិត្តខ្ពស់សម្រាប់អ្នកបង្កើតថ្មី។
          </p>
          <div class="flex items-center gap-4">
            <a
              href="#"
              class="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-blue-600 hover:text-white transition-all"
            >
              <!-- <IconFacebook class="w-5 h-5" /> -->
            </a>
            <a
              href="#"
              class="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-pink-600 hover:text-white transition-all"
            >
              <!-- <IconInstagram class="w-5 h-5" /> -->
            </a>
            <a
              href="#"
              class="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-red-600 hover:text-white transition-all"
            >
              <!-- <IconYoutube class="w-5 h-5" /> -->
            </a>
          </div>
        </div>

        <div>
          <h4 class="font-bold text-gray-900 dark:text-white mb-6">
            តំណភ្ជាប់រហ័ស
          </h4>
          <ul class="space-y-4 text-sm text-gray-500 dark:text-zinc-400">
            <li>
              <NuxtLink to="/" class="hover:text-blue-600 transition"
                >ទំព័រដើម</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-blue-600 transition"
                >អំពីយើង</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:text-blue-600 transition"
                >ទំនាក់ទំនង</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/lessons" class="hover:text-blue-600 transition"
                >អត្ថបទបច្ចេកវិទ្យា</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-gray-900 dark:text-white mb-6">ផលិតផល</h4>
          <ul class="space-y-4 text-sm text-gray-500 dark:text-zinc-400">
            <li>
              <NuxtLink to="/" class="hover:text-blue-600 transition"
                >គ្រឿង IoT & Smart Home</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/" class="hover:text-blue-600 transition"
                >Arduino & ESP32</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/" class="hover:text-blue-600 transition"
                >សេនស័រ (Sensors)</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/" class="hover:text-blue-600 transition"
                >ឧបករណ៍ជួសជុល</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-gray-900 dark:text-white mb-6">
            តាមដានព័ត៌មានថ្មីៗ
          </h4>
          <p class="text-sm text-gray-500 dark:text-zinc-400 mb-4">
            ចុះឈ្មោះដើម្បីទទួលបានការបញ្ចុះតម្លៃ និងចំណេះដឹងថ្មីៗ។
          </p>
          <form class="flex flex-col gap-2">
            <input
              type="email"
              placeholder="អ៊ីមែលរបស់អ្នក..."
              class="bg-gray-100 dark:bg-zinc-900 border-none rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none text-sm dark:text-gray-200"
            />
            <button
              class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition"
            >
              ចុះឈ្មោះ
            </button>
          </form>
        </div>
      </div>

      <div
        class="pt-8 border-t border-gray-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p class="text-xs text-gray-500 dark:text-zinc-500">
          © 2026
          <span class="text-blue-600 font-semibold">SMT-ELECTRONICS-STORE</span
          >. រក្សាសិទ្ធិគ្រប់យ៉ាង។
        </p>
        <div class="flex items-center gap-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/1200px-Visa_2021.svg.png"
            alt="Visa"
            class="h-4 grayscale hover:grayscale-0 transition"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
            alt="Mastercard"
            class="h-6 grayscale hover:grayscale-0 transition"
          />
          <span class="text-[10px] text-gray-400 uppercase tracking-widest"
            >ABA Pay Accepted</span
          >
        </div>
      </div>
    </div>
  </footer>
</template>
