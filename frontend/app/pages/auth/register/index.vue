<script setup>
const name = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);

const handleSocialLogin = (platform) => {
  console.log(`Logging in with ${platform}`);
};

const handleRegister = async () => {
  loading.value = true;
  // Simulate API Call
  setTimeout(() => {
    loading.value = false;
    alert("Account created successfully!");
  }, 2000);
};
</script>

<template>
  <div class="flex">
    <div class="hidden lg:flex w-1/2 bg-indigo-600 relative overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-20 z-10"></div>
      <img
        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
        alt="Shopping experience"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="relative z-20 flex flex-col justify-center px-20 text-white">
        <h1 class="text-5xl font-bold mb-6">Join Our Community</h1>
        <p class="text-xl text-indigo-100">
          ទទួលបានការបញ្ចុះតម្លៃពិសេស ១០% សម្រាប់ការបញ្ជាទិញលើកដំបូងរបស់អ្នក។
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
            បង្កើតគណនីថ្មី
          </h2>
          <p class="mt-2 text-sm text-gray-500">
            បំពេញព័ត៌មានខាងក្រោមដើម្បីចាប់ផ្តើមទិញទំនិញ
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-8">
          <button
            @click="handleSocialLogin('Google')"
            class="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm"
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
          <span class="absolute inset-x-0 top-1/2 h-px bg-gray-200"></span>
          <span class="relative bg-white px-4 text-sm text-gray-400"
            >ឬ ចុះឈ្មោះតាម Email</span
          >
        </div>

        <form @submit.prevent="handleRegister" class="space-y-5">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1"
              >ឈ្មោះពេញ</label
            >
            <input
              v-model="name"
              type="text"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
              placeholder="ឧ. សុខ ជា"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1"
              >អ៊ីមែល</label
            >
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
              placeholder="name@email.com"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1"
              >លេខសម្ងាត់</label
            >
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-indigo-600 transform active:scale-[0.98] transition-all shadow-lg shadow-gray-200 disabled:opacity-50"
          >
            {{ loading ? "កំពុងបង្កើត..." : "ចុះឈ្មោះឥឡូវនេះ" }}
          </button>
        </form>

        <p class="mt-8 text-center text-sm text-gray-600">
          មានគណនីរួចហើយ?
          <NuxtLink
            to="/auth/login"
            class="font-bold text-indigo-600 hover:text-indigo-500 underline underline-offset-4"
            >ចូលប្រើប្រាស់</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>
