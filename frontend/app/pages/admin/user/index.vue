<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import type { UserType } from "~/types";
import Create from "./-Actions/Create.vue";
import Update from "./-Actions/Update.vue";

const search = ref("");
const { fetchData, confirmDelete, deleteMutation } = useUsers();

const { isLoading, isError, refetch, data, error } = useQuery<UserType[]>({
  queryKey: ["users"],
  queryFn: fetchData,
});

const filteredData = computed(() => {
  if (!data.value) return [];
  if (!search.value) return data.value;
  return data.value.filter((item: UserType) =>
    item.username.toLowerCase().includes(search.value.toLowerCase()) || 
    item.email.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <!-- Header -->
    <el-card shadow="never">
      <el-page-header>
        <template #content>
          <span class="text-large font-600 mr-3">អ្នកប្រើប្រាស់ (Users)</span>
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
        
        <el-table-column label="ប្រវត្តិរូប (Profile)">
          <template #default="scope">
            <el-avatar :src="scope.row.profile" />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="ឈ្មោះ (Username)" sortable />
        <el-table-column prop="email" label="អ៊ីមែល (Email)" sortable />
        <el-table-column prop="phone" label="លេខទូរស័ព្ទ (Phone)" />
        <el-table-column prop="role" label="តួនាទី (Role)" sortable>
          <template #default="{ row }">
            <el-tag :type="row.role === 'ADMIN' ? 'danger' : 'primary'">
              {{ row.role }}
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
                placeholder="ស្វែងរកឈ្មោះ ឬអ៊ីមែល..."
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
