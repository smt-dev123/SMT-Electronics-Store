<template>
  <div class="flex flex-col items-center justify-center py-12 w-full">
    <el-icon class="is-loading" :size="30" color="#409eff">
      <Loading />
    </el-icon>
    <p class="mt-3 text-gray-500 text-sm">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { Loading } from "@element-plus/icons-vue";

defineProps({
  message: {
    type: String,
    default: "កំពុងផ្ទុកទិន្នន័យ...",
  },
});
</script>
