<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import type { DatasheetType } from "~/types";
import Create from "./-Actions/Create.vue";
import Update from "./-Actions/Update.vue";

const search = ref("");
const { fetchData, confirmDelete, deleteMutation } = useDatasheets();

const { isLoading, isError, refetch, data, error } = useQuery<DatasheetType[]>({
  queryKey: ["datasheets"],
  queryFn: fetchData,
});

const filteredData = computed(() => {
  if (!data.value) return [];
  if (!search.value) return data.value;
  return data.value.filter((item: DatasheetType) =>
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
          <span class="text-large font-600 mr-3">ឯកសារបច្ចេកទេស (Datasheets)</span>
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
        
        <el-table-column prop="name" label="ឈ្មោះ (Name)" sortable />
        <el-table-column prop="size" label="ទំហំ (Size)" />
        <el-table-column prop="productId" label="លេខកូដ Product" sortable />
        <el-table-column label="ឯកសារ (File)">
          <template #default="{ row }">
            <el-link :href="row.fileUrl" target="_blank" type="primary">ទាញយកឯកសារ</el-link>
          </template>
        </el-table-column>

        <el-table-column label="កាលបរិច្ឆេទបង្កើត">
          <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>
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
