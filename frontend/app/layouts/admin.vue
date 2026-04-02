<template>
  <div class="min-h-screen flex bg-gray-50 overflow-x-hidden">
    <Sidebar />

    <div class="flex-1 flex flex-col min-w-0 transition-all duration-300">
      <Navbar />

      <main class="flex-1 p-4 md:p-6 overflow-y-auto">
        <slot />
      </main>

      <footer class="text-center py-6 text-sm text-gray-500 border-t bg-white">
        <p class="font-khmer">
          © ២០២៦ រក្សាសិទ្ធគ្រប់យ៉ាងដោយ៖
          <span class="font-semibold text-gray-700">លុយ សុមាត្រា</span>
        </p>
      </footer>
    </div>
  </div>
</template>

<style>
/* Global scrollbar for the whole page if needed */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}
</style>
