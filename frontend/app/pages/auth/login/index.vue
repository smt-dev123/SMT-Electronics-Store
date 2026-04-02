<script setup>
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    console.log("Logging in...", {
      email: email.value,
      password: password.value,
    });
    navigateTo("/admin/dashboard");
  }, 500);
};
</script>

<template>
  <div class="min-h-screen flex">
    <div class="hidden lg:flex w-1/2 bg-gray-900 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent z-10"
      ></div>
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
        alt="Ecommerce Shopping"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="relative z-20 flex flex-col justify-end p-20 text-white">
        <h1 class="text-4xl font-bold mb-4">រីករាយការទិញទំនិញឡើងវិញ!</h1>
        <p class="text-lg text-gray-200">
          ចូលប្រើប្រាស់គណនីរបស់អ្នក ដើម្បីពិនិត្យមើលស្ថានភាពទំនិញ
          និងការផ្តល់ជូនពិសេស។
        </p>
      </div>
    </div>

    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div class="max-w-md w-full">
        <div class="mb-10 text-center lg:text-left">
          <NuxtLink
            to="/"
            class="text-2xl font-black text-indigo-600 tracking-tighter uppercase"
          >
            My<span class="text-gray-900">Store</span>
          </NuxtLink>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            សូមស្វាគមន៍មកវិញ
          </h2>
          <!-- <p class="mt-2 text-sm text-gray-500">
            សូមបញ្ចូលព័ត៌មានរបស់អ្នកដើម្បីចូលប្រើប្រាស់
          </p> -->
        </div>

        <div class="grid grid-cols-2 gap-4 mb-8">
          <button
            class="flex items-center justify-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-sm"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              class="w-5 h-5 mr-2"
              alt="Google"
            />
            Google
          </button>
          <button
            class="flex items-center justify-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-sm"
          >
            <img
              src="https://www.svgrepo.com/show/448224/facebook.svg"
              class="w-5 h-5 mr-2"
              alt="Facebook"
            />
            Facebook
          </button>
        </div>

        <div class="relative mb-8 text-center">
          <span class="absolute inset-x-0 top-1/2 h-px bg-gray-100"></span>
          <span class="relative bg-white px-4 text-sm text-gray-400 font-light"
            >ឬ បន្តជាមួយអ៊ីមែល</span
          >
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5"
              >អ៊ីមែលរបស់អ្នក</label
            >
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
              placeholder="name@company.com"
            />
          </div>

          <div>
            <div class="flex justify-between mb-1.5">
              <label class="block text-sm font-semibold text-gray-700"
                >លេខសម្ងាត់</label
              >
              <NuxtLink
                to="/forgot-password"
                class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >ភ្លេចលេខសម្ងាត់?</NuxtLink
              >
            </div>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
              placeholder="••••••••"
            />
          </div>

          <div class="flex items-center">
            <input
              id="remember"
              v-model="rememberMe"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-md cursor-pointer"
            />
            <label
              for="remember"
              class="ml-2 block text-sm text-gray-600 cursor-pointer"
              >ចងចាំខ្ញុំក្នុងឧបករណ៍នេះ</label
            >
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transform active:scale-[0.98] transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              កំពុងផ្ទៀងផ្ទាត់...
            </span>
            <span v-else>ចូលប្រើប្រាស់</span>
          </button>
        </form>

        <p class="mt-8 text-center text-sm text-gray-600">
          មិនទាន់មានគណនីមែនទេ?
          <NuxtLink
            to="/auth/register"
            class="font-bold text-indigo-600 hover:text-indigo-500 underline underline-offset-4"
            >បង្កើតគណនីថ្មី</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>
