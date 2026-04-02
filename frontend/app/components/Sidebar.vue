<script setup lang="ts">
const collapsed = useState("sidebar_collapsed", () => false);
const isMobile = ref(false);
const openDropdown = ref<string | null>(null);

const menuItems = [
  {
    key: "1",
    icon: ElIconDataAnalysis,
    label: "ផ្ទាំងគ្រប់គ្រង",
    url: "dashboard",
  },
  {
    key: "2",
    icon: ElIconDataAnalysis,
    label: "ការគ្រប់គ្រង",
    submenu: [
      { label: "ស្លាយ", url: "slide" },
      { label: "អំពីយើង", url: "about" },
      { label: "ទំនាក់ទំនង", url: "contact" },
    ],
  },
  {
    key: "3",
    icon: ElIconDataAnalysis,
    label: "ផលិតផល",
    submenu: [
      { label: "ក្រុមហ៊ុន", url: "brand" },
      { label: "ប្រភេទ", url: "category" },
      { label: "ផលិតផល", url: "product" },
      { label: "គ្រឿងអេឡិចត្រូនិច", url: "electronic" },
    ],
  },
  { key: "4", icon: ElIconDataAnalysis, label: "អត្ថបទ/មេរៀន", url: "lesson" },
  { key: "5", icon: ElIconDataAnalysis, label: "អ្នកប្រើប្រាស់", url: "user" },
  { key: "6", icon: ElIconDataAnalysis, label: "ការកំណត់", url: "setting" },
];

const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};

const toggleDropdown = (key: string) => {
  if (collapsed.value && !isMobile.value) return;
  openDropdown.value = openDropdown.value === key ? null : key;
};

const checkScreen = () => {
  isMobile.value = window.innerWidth < 1024;
  if (isMobile.value) {
    collapsed.value = true;
  } else {
    collapsed.value = false;
  }
};

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreen);
});

watch(collapsed, (newVal) => {
  if (newVal && !isMobile.value) openDropdown.value = null;
});
</script>

<template>
  <div
    v-if="isMobile && !collapsed"
    class="fixed inset-0 bg-black/50 z-[60]"
    @click="collapsed = true"
  />

  <aside
    :class="[
      'fixed lg:sticky top-0 left-0 h-screen bg-white text-gray-800 border-r shadow-sm flex flex-col z-[70] transition-all duration-300 ease-in-out',
      !isMobile && collapsed ? 'w-20' : 'w-64',
      isMobile && collapsed ? '-translate-x-full' : 'translate-x-0',
    ]"
  >
    <div class="h-16 flex items-center justify-between px-4 border-b shrink-0">
      <div v-if="!collapsed || isMobile" class="flex items-center">
        <img
          class="h-8 w-auto"
          src="https://api.weteka.org/public/orgs/6603842b23d9386625ec762b/images/9b612c80-afff-4bb4-b4e7-330d65d5f9a3.png"
        />
      </div>

      <button
        v-if="!isMobile"
        @click="toggleSidebar"
        class="p-2 rounded-md hover:bg-gray-100 text-gray-500 transition ml-auto"
      >
        <el-icon size="20">
          <ElIconExpand v-if="collapsed" />
          <ElIconFold v-else />
        </el-icon>
      </button>
    </div>

    <nav class="font-khmer mt-3 flex-1 overflow-y-auto custom-scrollbar">
      <ul class="space-y-2 px-3 font-medium">
        <li v-for="menu in menuItems" :key="menu.key">
          <NuxtLink
            v-if="!menu.submenu"
            :to="`/admin/${menu.url}`"
            class="menu-item group"
            :class="{ 'justify-center': collapsed && !isMobile }"
            @click="isMobile && (collapsed = true)"
          >
            <el-icon :size="20"><component :is="menu.icon" /></el-icon>
            <span v-if="!collapsed || isMobile" class="truncate">{{
              menu.label
            }}</span>
          </NuxtLink>

          <div
            v-else
            @click="toggleDropdown(menu.key)"
            class="menu-item cursor-pointer group"
            :class="{ 'justify-center': collapsed && !isMobile }"
          >
            <el-icon :size="20"><component :is="menu.icon" /></el-icon>
            <span v-if="!collapsed || isMobile" class="flex-1 truncate">{{
              menu.label
            }}</span>
            <el-icon
              v-if="!collapsed || isMobile"
              :class="{ 'rotate-180': openDropdown === menu.key }"
              class="transition-transform"
            >
              <ElIconArrowDown />
            </el-icon>
          </div>

          <transition name="expand">
            <ul
              v-if="openDropdown === menu.key && (!collapsed || isMobile)"
              class="submenu"
            >
              <li v-for="sub in menu.submenu" :key="sub.url">
                <NuxtLink
                  :to="`/admin/${sub.url}`"
                  class="submenu-item"
                  @click="isMobile && (collapsed = true)"
                >
                  {{ sub.label }}
                </NuxtLink>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.menu-item {
  @apply flex items-center gap-2 px-3 py-2 rounded-xl text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600;
}
.router-link-active {
  @apply bg-blue-600 text-white !important;
}
.router-link-active .el-icon {
  @apply text-white !important;
}
.submenu {
  @apply ml-9 mt-1 space-y-1 overflow-hidden;
}
.submenu-item {
  @apply block px-3 py-2 text-sm rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition;
}
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
