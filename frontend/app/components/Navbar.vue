<script lang="ts" setup>
const collapsed = useState("sidebar_collapsed");
const isMobile = ref(false);

onMounted(() => {
  isMobile.value = window.innerWidth < 1024;
  window.addEventListener("resize", () => {
    isMobile.value = window.innerWidth < 1024;
  });
});
</script>

<template>
  <header
    class="flex justify-between items-center bg-white px-4 h-16 shadow-sm border-b sticky top-0 z-40"
  >
    <div class="flex items-center gap-3">
      <button
        v-if="isMobile"
        @click="collapsed = false"
        class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
      >
        <el-icon size="24"><ElIconExpand /></el-icon>
      </button>

      <h2 class="font-khmer text-lg font-medium">
        Late afternoon, <b class="font-semibold text-gray-800">លុយ សុមាត្រា</b>
      </h2>
    </div>

    <NuxtLink
      to="/"
      class="flex items-center text-gray-500 hover:text-red-600 transition"
    >
      <el-icon :size="20"><ElIconSwitchButton /></el-icon>
    </NuxtLink>
  </header>
</template>
