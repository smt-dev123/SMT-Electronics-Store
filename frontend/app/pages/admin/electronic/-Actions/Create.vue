<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { Form as VForm, Field as VField } from "vee-validate";
import { ElectronicSchema } from "~/utils/schemas";
import { ElMessage } from "element-plus";
import { useQuery } from "@tanstack/vue-query";

const { createMutation } = useElectronics();
const { fetchData: getProducts } = useProducts();
const { fetchData: getTypes } = useElectronicTypes();

const dialogVisible = ref(false);
const searchQuery = ref("");

// ទាញយក Products (ប្រើ Remote Search)
const { data: productResponse, isLoading: isProductLoading } = useQuery({
  queryKey: ["products-search", searchQuery],
  queryFn: () => getProducts(1, searchQuery.value), // ទាញយកតែ Page 1 ដែលមានឈ្មោះត្រូវនឹងការ search
  enabled: () => dialogVisible.value, // ដំណើរការតែពេលបើក Dialog
  staleTime: 5000,
});

const { data: types } = useQuery({
  queryKey: ["electronic-types"],
  queryFn: getTypes,
  enabled: () => dialogVisible.value,
});

const form = reactive({
  sku: "",
  package: "",
  in_stock: true,
  product_id: "",
  type_id: "",
});

// មុខងារសម្រាប់ចាប់យកការវាយអក្សរពី Select Box
const remoteMethod = (query: string) => {
  searchQuery.value = query;
};

const handleClose = () => {
  form.sku = "";
  form.package = "";
  form.in_stock = true;
  form.product_id = "";
  form.type_id = "";
  searchQuery.value = "";
};

const onSubmit = async (values: any) => {
  try {
    await createMutation.mutateAsync(values);
    dialogVisible.value = false;
    handleClose();
    ElMessage.success("បង្កើតបានជោគជ័យ");
  } catch (error: any) {
    ElMessage.error(error.message || "មានបញ្ហា");
  }
};
</script>

<template>
  <el-button type="primary" @click="dialogVisible = true">
    <el-icon class="mr-1"><Plus /></el-icon> បង្កើតអេឡិចត្រូនិច
  </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="បន្ថែមព័ត៌មានលម្អិតអេឡិចត្រូនិច"
    width="500px"
    @close="handleClose"
  >
    <VForm
      :validation-schema="ElectronicSchema"
      @submit="onSubmit"
      v-slot="{ errors }"
    >
      <el-form label-position="top">
        <el-form-item label="ជ្រើសរើសផលិតផល" :error="errors.product_id" required>
          <VField name="product_id" v-model="form.product_id">
            <el-select
              v-model="form.product_id"
              filterable
              remote
              reserve-keyword
              placeholder="វាយឈ្មោះដើម្បីស្វែងរកផលិតផល..."
              :remote-method="remoteMethod"
              :loading="isProductLoading"
              class="w-full"
            >
              <el-option
                v-for="item in productResponse?.data"
                :key="item.id"
                :label="item.name"
                :value="String(item.id)"
              />
            </el-select>
          </VField>
        </el-form-item>

        <el-form-item label="កូដទំនិញ (SKU)" :error="errors.sku" required>
          <VField name="sku" v-model="form.sku">
            <el-input v-model="form.sku" placeholder="ឧទាហរណ៍: CPU-INTEL-I9" />
          </VField>
        </el-form-item>

        <el-form-item label="កញ្ចប់ (Package)" :error="errors.package" required>
          <VField name="package" v-model="form.package">
            <el-input
              v-model="form.package"
              placeholder="ឧទាហរណ៍: Box or Tray"
            />
          </VField>
        </el-form-item>

        <el-form-item label="ប្រភេទ (Type)" :error="errors.type_id" required>
          <VField name="type_id" v-model="form.type_id">
            <el-select
              v-model="form.type_id"
              placeholder="ជ្រើសរើសប្រភេទ..."
              class="w-full"
            >
              <el-option
                v-for="t in types"
                :key="t.id"
                :label="t.name"
                :value="String(t.id)"
              />
            </el-select>
          </VField>
        </el-form-item>

        <el-form-item label="ស្ថានភាពស្តុក" :error="errors.in_stock">
          <VField name="in_stock" v-model="form.in_stock">
            <div class="flex items-center">
              <el-switch v-model="form.in_stock" />
              <span class="ml-2">{{
                form.in_stock ? "មានក្នុងស្តុក" : "ដាច់ស្តុក"
              }}</span>
            </div>
          </VField>
        </el-form-item>
      </el-form>

      <div class="flex justify-end mt-6">
        <el-button @click="dialogVisible = false">បោះបង់</el-button>
        <el-button
          type="primary"
          native-type="submit"
          :loading="createMutation.isPending.value"
        >
          រក្សាទុកទិន្នន័យ
        </el-button>
      </div>
    </VForm>
  </el-dialog>
</template>
