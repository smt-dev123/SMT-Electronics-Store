<script setup>
const step = ref(1); // 1: Shipping, 2: Payment
const email = ref("");
const firstName = ref("");
const lastName = ref("");
const address = ref("");
const city = ref("");
const paymentMethod = ref("card"); // 'card' or 'aba' or 'cod'

const handlePlaceOrder = () => {
  alert("ការបញ្ជាទិញទទួលបានជោគជ័យ! សូមអរគុណ។");
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 md:py-20">
    <div class="container mx-auto px-4 md:px-12 max-w-7xl">
      <div class="flex flex-col lg:flex-row gap-12">
        <div
          class="flex-grow bg-white p-8 md:p-12 shadow-sm border border-zinc-100 rounded-sm"
        >
          <div
            class="flex items-center gap-4 mb-12 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <span :class="step >= 1 ? 'text-blue-600' : 'text-zinc-300'"
              >01 ព័ត៌មានដឹកជញ្ជូន</span
            >
            <span class="w-8 h-px bg-zinc-200"></span>
            <span :class="step >= 2 ? 'text-blue-600' : 'text-zinc-300'"
              >02 ការបង់ប្រាក់</span
            >
          </div>

          <form @submit.prevent="handlePlaceOrder">
            <div v-if="step === 1" class="space-y-6 animate-fade-in">
              <h2 class="text-2xl font-black uppercase tracking-tighter mb-8">
                អាសយដ្ឋានដឹកជញ្ជូន
                <br />
              </h2>
              <div class="text-blue-600">
                <p>
                  - មានជ្រើសរើសក្រុមហ៊ុនដឹកជញ្ជូនជាច្រើន
                  ដើម្បីធានាថាទំនិញរបស់អ្នកមកដល់ដោយសុវត្ថិភាព និងទាន់ពេលវេលា។
                </p>
                <p>
                  - អាសយដ្ឋានដឹកជញ្ជូនទទួលអ៊ីវែល
                  និងលេខទូរស័ព្ទសម្រាប់ការទំនាក់ទំនង និងការតាមដានការដឹកជញ្ជូន។
                </p>
                <p>- ផ្ញើវិកាយបត្រ និងព័ត៌មានការទិញតាមតេលេក្រាម</p>
                <p class="text-red-600">- ត្រូវបំពេញគ្រប់ព័ត៌មាន</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-[10px] font-bold uppercase text-zinc-500"
                    >នាមត្រកូល</label
                  >
                  <input
                    v-model="firstName"
                    type="text"
                    class="w-full border-b border-zinc-200 py-3 focus:border-blue-600 outline-none transition-all"
                    placeholder="ឧ. សុខ"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-bold uppercase text-zinc-500"
                    >នាមខ្លួន</label
                  >
                  <input
                    v-model="lastName"
                    type="text"
                    class="w-full border-b border-zinc-200 py-3 focus:border-blue-600 outline-none transition-all"
                    placeholder="ឧ. ជា"
                    required
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-[10px] font-bold uppercase text-zinc-500"
                  >អ៊ីមែល</label
                >
                <input
                  v-model="email"
                  type="email"
                  class="w-full border-b border-zinc-200 py-3 focus:border-blue-600 outline-none transition-all"
                  placeholder="example@mail.com"
                  required
                />
              </div>

              <div class="space-y-2">
                <label class="text-[10px] font-bold uppercase text-zinc-500"
                  >អាសយដ្ឋានលម្អិត</label
                >
                <input
                  v-model="address"
                  type="text"
                  class="w-full border-b border-zinc-200 py-3 focus:border-blue-600 outline-none transition-all"
                  placeholder="ផ្ទះលេខ, ផ្លូវ, សង្កាត់..."
                  required
                />
              </div>

              <button
                @click="step = 2"
                type="button"
                class="w-full bg-zinc-950 text-white font-black py-5 mt-8 uppercase text-xs tracking-[0.3em] hover:bg-blue-600 transition-all"
              >
                បន្តទៅការបង់ប្រាក់
              </button>
            </div>

            <div v-if="step === 2" class="space-y-8 animate-fade-in">
              <h2 class="text-2xl font-black uppercase tracking-tighter">
                ជ្រើសរើសវិធីសាស្ត្របង់ប្រាក់
              </h2>

              <div class="space-y-4">
                <label
                  class="flex items-center justify-between p-6 border rounded-sm cursor-pointer transition-all"
                  :class="
                    paymentMethod === 'aba'
                      ? 'border-blue-600 bg-blue-50/30'
                      : 'border-zinc-100 hover:border-zinc-300'
                  "
                >
                  <div class="flex items-center gap-4">
                    <input
                      type="radio"
                      v-model="paymentMethod"
                      value="aba"
                      class="accent-blue-600"
                    />
                    <span class="font-bold uppercase text-sm tracking-widest"
                      >ABA PAY</span
                    >
                  </div>
                  <img
                    src="https://vatanak-smart-ads.s3.ap-southeast-1.amazonaws.com/1684310540.png"
                    class="h-6 opacity-80"
                    alt="ABA"
                  />
                </label>

                <label
                  class="flex items-center justify-between p-6 border rounded-sm cursor-pointer transition-all"
                  :class="
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/30'
                      : 'border-zinc-100 hover:border-zinc-300'
                  "
                >
                  <div class="flex items-center gap-4">
                    <input
                      type="radio"
                      v-model="paymentMethod"
                      value="card"
                      class="accent-blue-600"
                    />
                    <span class="font-bold uppercase text-sm tracking-widest"
                      >កាតឥណទាន (Visa/MasterCard)</span
                    >
                  </div>
                  <div class="flex gap-2">
                    <img
                      src="https://www.svgrepo.com/show/354513/visa.svg"
                      class="h-4"
                    />
                    <img
                      src="https://www.svgrepo.com/show/354039/mastercard.svg"
                      class="h-4"
                    />
                  </div>
                </label>

                <label
                  class="flex items-center justify-between p-6 border rounded-sm cursor-pointer transition-all"
                  :class="
                    paymentMethod === 'cod'
                      ? 'border-blue-600 bg-blue-50/30'
                      : 'border-zinc-100 hover:border-zinc-300'
                  "
                >
                  <div class="flex items-center gap-4">
                    <input
                      type="radio"
                      v-model="paymentMethod"
                      value="cod"
                      class="accent-blue-600"
                    />
                    <span class="font-bold uppercase text-sm tracking-widest"
                      >បង់ប្រាក់ពេលទទួលទំនិញ</span
                    >
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-zinc-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </label>
              </div>

              <div class="flex gap-4 mt-12">
                <button
                  @click="step = 1"
                  type="button"
                  class="flex-1 border border-zinc-200 text-zinc-500 font-bold py-5 uppercase text-xs tracking-widest hover:bg-zinc-50 transition-all"
                >
                  ត្រឡប់ក្រោយ
                </button>
                <button
                  type="submit"
                  class="flex-[2] bg-blue-600 text-white font-black py-5 uppercase text-xs tracking-[0.3em] hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all"
                >
                  បញ្ជាទិញឥឡូវនេះ
                </button>
              </div>
            </div>
          </form>
        </div>

        <div class="w-full lg:w-[450px]">
          <div class="bg-zinc-950 text-white p-10 sticky top-12 rounded-sm">
            <h3
              class="text-xl font-black uppercase tracking-widest mb-10 border-b border-white/10 pb-6"
            >
              សេចក្តីសង្ខេប
            </h3>

            <div class="space-y-6 mb-10">
              <div class="flex gap-4">
                <div class="relative w-16 h-20 bg-zinc-800 flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000"
                    class="w-full h-full object-cover opacity-80"
                  />
                  <span
                    class="absolute -top-2 -right-2 bg-blue-600 text-[10px] w-5 h-5 flex items-center justify-center rounded-full"
                    >1</span
                  >
                </div>
                <div class="flex flex-col justify-center">
                  <h4 class="text-xs font-bold uppercase tracking-tight">
                    Wireless Headphones Pro
                  </h4>
                  <p class="text-[10px] text-zinc-500 mt-1 uppercase font-mono">
                    $299.00
                  </p>
                </div>
              </div>
            </div>

            <div
              class="space-y-4 text-sm font-bold uppercase tracking-tighter border-t border-white/10 pt-8"
            >
              <div class="flex justify-between text-zinc-400">
                <span>តម្លៃទំនិញ</span>
                <span>$299.00</span>
              </div>
              <div class="flex justify-between text-zinc-400">
                <span>ថ្លៃដឹកជញ្ជូន</span>
                <span>$10.00</span>
              </div>
              <div
                class="flex justify-between text-2xl font-black pt-4 text-white"
              >
                <span>សរុបរួម</span>
                <span class="text-blue-500">$309.00</span>
              </div>
            </div>

            <div class="mt-12 p-4 bg-zinc-900 border border-white/5 rounded-sm">
              <p
                class="text-[9px] text-red-500 leading-relaxed uppercase tracking-widest text-center"
              >
                រាល់ការបង់ប្រាក់របស់អ្នកត្រូវបានការពារដោយប្រព័ន្ធសុវត្ថិភាពខ្ពស់បំផុត។
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
