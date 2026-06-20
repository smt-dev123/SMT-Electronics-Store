<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import type { BrandType } from "~/types/index";
import Create from "./-Actions/Create.vue";
import Update from "./-Actions/Update.vue";

const search = ref("");
const { fetchBrands, confirmDelete, deleteMutation } = useBrands();

const { isLoading, isError, refetch, data, error } = useQuery<BrandType[]>({
  queryKey: ["brands"],
  queryFn: fetchBrands,
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 60 * 24,
  refetchOnWindowFocus: false,
});

console.log("Brands Data:", data.value);
const filteredData = computed(() => {
  const brands = data.value || [];

  if (!search.value) return brands;

  return brands.filter((item: BrandType) =>
    item.name.toLowerCase().includes(search.value.toLowerCase()),
  );
});
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <!-- Header -->
    <el-card shadow="never">
      <el-page-header>
        <template #content>
          <span class="text-large font-600 mr-3">ម៉ាកយីហោ</span>
        </template>
        <template #extra>
          <Create />
        </template>
      </el-page-header>
    </el-card>

    <!-- Content -->
    <el-card shadow="never">
      <CommonLoadingState v-if="isLoading" />

      <CommonErrorState
        v-else-if="isError"
        :description="error?.message"
        @retry="refetch"
      />

      <!-- Table -->
      <el-table v-else :data="filteredData" style="width: 100%">
        <el-table-column type="index" label="ល.រ" width="70" sortable fixed />
        <el-table-column label="រូបភាព">
          <template #default="scope">
            <el-image
              style="width: 40px; height: 40px"
              :src="scope.row.icon"
              fit="cover"
              class="rounded shadow-sm"
            >
              <template #error>
                <div
                  class="flex justify-center items-center h-full bg-gray-100"
                >
                  <el-icon><Picture /></el-icon>
                </div>
              </template>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="ឈ្មោះក្រុមហ៊ុន" sortable />
        <el-table-column width="180" fixed="right">
          <template #header>
            <!-- Search -->
            <div class="flex items-center gap-2">
              <el-input
                v-model="search"
                placeholder="ស្វែងរកឈ្មោះ..."
                clearable
                style="width: 250px"
              />
            </div>
          </template>
          <template #default="scope">
            <Update :data="scope.row" />
            <el-button
              type="danger"
              size="small"
              :loading="
                deleteMutation.isPending.value &&
                deleteMutation.variables.value === scope.row.id
              "
              @click="confirmDelete(scope.row.id)"
            >
              លុប
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
