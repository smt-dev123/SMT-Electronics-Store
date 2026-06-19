<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import Create from "./-Actions/Create.vue";
import Update from "./-Actions/Update.vue";
import { Picture } from "@element-plus/icons-vue";

const currentPage = ref(1);
const search = ref("");

const { fetchData, confirmDelete, deleteMutation } = useProducts();

const { isLoading, isError, data, error, refetch } = useQuery({
  queryKey: ["products", currentPage, search],
  queryFn: () => fetchData(currentPage.value, search.value),
  placeholderData: (previousData) => previousData,
});

</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <!-- Header -->
    <el-card shadow="never">
      <el-page-header>
        <template #content>
          <span class="text-large font-600 mr-3">ផលិតផល (Products)</span>
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
        
        <el-table-column label="រូបភាព" width="80">
          <template #default="{ row }">
            <el-image
              v-if="row.thumbnailUrl"
              :src="row.thumbnailUrl"
              class="w-10 h-10 object-cover rounded"
              :preview-src-list="[row.thumbnailUrl]"
              preview-teleported
            />
            <div v-else class="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-400">
              <el-icon><Picture /></el-icon>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="name"
          label="ឈ្មោះផលិតផល"
          sortable
          min-width="150"
        />
        <el-table-column prop="price" label="តម្លៃ" sortable>
          <template #default="{ row }"> ${{ row.price }} </template>
        </el-table-column>
        <el-table-column label="ស្តុក" sortable>
          <template #default="{ row }">
            <el-tag
              :type="
                row.stock_quantity <= 5
                  ? 'danger'
                  : row.stock_quantity <= 10
                    ? 'success'
                    : 'primary'
              "
            >
              {{ row.stock_quantity }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="discount" label="បញ្ចុះតម្លៃ" />
        <el-table-column label="លក្ខខណ្ឌ" min-width="80">
          <template #default="{ row }">
            <el-tag :type="row.is_used ? 'warning' : 'info'">
              {{ row.is_used ? "មួយទឹក" : "ថ្មី" }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="brand.name" label="Brand" min-width="100" />
        <el-table-column label="Category" min-width="150">
          <template #default="{ row }">
            <div class="flex gap-2">
              <el-tag v-for="category in row.categories" :key="category.id">
                {{ category.name }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="ស្ថានភាព" sortable min-width="120">
          <template #default="{ row }">
            <el-tag :type="row.is_active ? 'success' : 'danger'">
              {{ row.is_active ? "សកម្ម" : "អសកម្ម" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="កាលបរិច្ឆេទបង្កើត" min-width="150">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="កាលបរិច្ឆេទធ្វើបច្ចុប្បន្នភាព" min-width="150">
          <template #default="{ row }">
            {{ formatDate(row.updated_at) }}
          </template>
        </el-table-column>
        <el-table-column width="180" fixed="right">
          <template #header>
            <!-- Search -->
            <div class="flex items-center gap-2">
              <el-input
                v-model.lazy="search"
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
                deleteMutation.variables.value === scope.row.slug
              "
              @click="confirmDelete(scope.row.slug)"
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
          :total="data?.meta?.page || 0"
        />
      </div>
    </el-card>
  </div>
</template>
