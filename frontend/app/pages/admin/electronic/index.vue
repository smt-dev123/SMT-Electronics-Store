<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import type { ElectronicType } from "~/types";
import Create from "./-Actions/Create.vue";
import Update from "./-Actions/Update.vue";

const currentPage = ref(1);
const search = ref("");
const { fetchData, confirmDelete, deleteMutation } = useElectronics();

const { isLoading, isError, refetch, data, error } = useQuery(
  {
    queryKey: ["electronics", currentPage, search],
    queryFn: () => fetchData(currentPage.value, search.value),
    placeholderData: (previousData) => previousData,
  },
);
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <!-- Header -->
    <el-card shadow="never">
      <el-page-header>
        <template #content>
          <span class="text-large font-600 mr-3"
            >គ្រឿងអេឡិចត្រូនិក (Electronics)</span
          >
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
      <el-table v-else :data="data?.data || []" style="width: 100%">
        <el-table-column type="index" label="ល.រ" width="70" sortable fixed />
        <el-table-column prop="product.name" label="ផលិតផល" />
        <el-table-column prop="sku" label="កូដទំនិញ (SKU)" sortable />
        <el-table-column prop="package" label="កញ្ចប់" sortable />
        <el-table-column prop="type.name" label="លេខកូដ Type" />
        <el-table-column label="ក្នុងស្តុក" sortable width="140">
          <template #default="{ row }">
            <el-tag :type="row.in_stock ? 'success' : 'danger'">
              {{ row.in_stock ? "មានក្នុងស្តុក" : "អស់ពីស្តុក" }}
            </el-tag>
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
                placeholder="ស្វែងរក SKU..."
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
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="10"
          background
          layout="prev, pager, next, total"
          :total="data?.total || 0"
        />
      </div>
    </el-card>
  </div>
</template>
