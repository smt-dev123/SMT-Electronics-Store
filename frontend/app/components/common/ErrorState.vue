<template>
  <div class="flex flex-col items-center justify-center py-10 w-full">
    <el-alert
      :title="title"
      :description="description"
      type="error"
      show-icon
      :closable="false"
      class="max-w-md"
    />
    <el-button type="primary" plain class="mt-4" @click="$emit('retry')">
      ព្យាយាមម្តងទៀត
    </el-button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "មានបញ្ហាផ្នែកបច្ចេកទេស",
  },
  description: {
    type: String,
    default: "មិនអាចទាញទិន្នន័យបានទេ សូមព្យាយាមម្តងទៀតនៅពេលក្រោយ។",
  },
});

defineEmits(["retry"]);
</script>
