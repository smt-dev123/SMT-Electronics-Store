<template>
  <div class="flex flex-col gap-4 w-full">
    <!-- Header -->
    <el-card shadow="never">
      <el-page-header>
        <template #content>
          <span class="text-large font-600 mr-3">ប្លុកផុស</span>
        </template>
        <template #extra>
          <el-button type="primary"> កំណត់ចំណងជើង </el-button>
          <el-button type="primary"> បន្ថែមប្លុកផុស </el-button>
          <AddTeacher />
        </template>
      </el-page-header>
    </el-card>

    <!-- Content -->
    <el-card shadow="never">
      <!-- Table -->
      <el-table :data="data" style="width: 100%">
        <el-table-column prop="id" label="ID" width="70" sortable fixed />
        <el-table-column label="រូបភាព" width="100">
          <template #default="{ row }">
            <el-image
              style="width: 30px; height: 30px"
              :src="row.image"
              :preview-src-list="[row.image]"
              fit="cover"
              preview-teleported
            />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="ចំណងជើង" />
        <el-table-column prop="content" label="ការពិពណ៌នា" />
        <el-table-column label="កម្មវិធីសិក្សា">
          <template #default="{ row }">
            <el-tag
              v-for="item in row.tag"
              :key="item.id"
              style="margin-right: 4px"
            >
              {{ item }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="ការបង្ហាញ">
          <template #default="{ row }">
            <el-tag :type="row.is_active ? 'primary' : 'danger'" class="mr-1">
              {{ row.is_active ? "បង្ហាញ" : "មិនបង្ហាញ" }}
            </el-tag>
            <el-tag v-show="row.is_pin" type="success">
              {{ row.is_pin ? "Pin" : null }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="កាលបរិច្ឆេទបង្កើត" />
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
            <el-button type="success" size="small"> កែប្រែ </el-button>
            <el-button type="danger" size="small"> លុប </el-button>
            <UpdateTeacher :data="scope.row" />
            <DeleteTeacher :data="scope.row" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { devNull } from "os";

const search = ref("");

const data = [
  {
    id: "1",
    title: "ការរៀន",
    content: "សិស្សថ្នាក់ទី៩",
    tag: ["IoT", "Club"],
    is_pin: true, // សម្រាប់ដាក់ផ្នែកខាងលើ
    is_active: true,
    image:
      "https://sala.moeys.gov.kh/_next/image?url=https%3A%2F%2Fapi.weteka.org%2Fpublic%2Forgs%2F68107d80b6cd11f124fe8f3a%2Fimages%2F9c7d6ea8-ab0f-427a-9b23-1f144764893e.image%5B1%5D&w=1920&q=75",
    created_at: "01/01/2025",
    updated_at: "01/02/2025",
  },
];
</script>
