<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import { Edit } from "@element-plus/icons-vue";
import { Form as VForm, Field as VField } from "vee-validate";
import { ElectronicSchema } from "~/utils/schemas";
import type { ElectronicType } from "~/types";
import { ElMessage } from "element-plus";
import { useQuery } from "@tanstack/vue-query";

const props = defineProps<{
  data: ElectronicType;
}>();

const { updateMutation } = useElectronics();
const { fetchData: getProducts } = useProducts();
const { fetchData: getTypes } = useElectronicTypes();

const dialogVisible = ref(false);
const searchQuery = ref("");

// ១. ទាញយក Products (Remote Search)
const { data: productResponse, isLoading: isProductLoading } = useQuery({
  queryKey: ["products-search", searchQuery],
  queryFn: () => getProducts(1, searchQuery.value),
  enabled: () => dialogVisible.value,
  staleTime: 5000,
});

// ២. ទាញយក Types
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

// ចាប់យកទិន្នន័យពី Props មកដាក់ក្នុង Form ពេលបើកកែប្រែ
watch(
  () => props.data,
  (newData) => {
    if (newData) {
      form.sku = newData.sku;
      form.package = newData.package;
      form.in_stock = newData.in_stock;
      form.product_id = String(newData.product_id); // បម្លែងជា String ដើម្បីឱ្យត្រូវនឹង Value ក្នុង Select
      form.type_id = String(newData.type_id);
    }
  },
  { immediate: true, deep: true },
);

const remoteMethod = (query: string) => {
  searchQuery.value = query;
};

const handleClose = () => {
  // បោះទិន្នន័យដើមចូលវិញពេលបិទ Dialog
  Object.assign(form, {
    sku: props.data.sku,
    package: props.data.package,
    in_stock: props.data.in_stock,
    product_id: String(props.data.product_id),
    type_id: String(props.data.type_id),
  });
  searchQuery.value = "";
};

const onSubmit = async (values: any) => {
  try {
    await updateMutation.mutateAsync({
      id: props.data.id!,
      data: values,
    });
    ElMessage.success("កែប្រែបានជោគជ័យ");
    dialogVisible.value = false;
  } catch (error: any) {
    ElMessage.error(error.message || "មានបញ្ហា");
  }
};
</script>

<template>
  <el-button
    type="primary"
    size="small"
    class="mr-2"
    @click="dialogVisible = true"
  >
    <el-icon><Edit /></el-icon>
  </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="កែប្រែព័ត៌មានអេឡិចត្រូនិច"
    width="500px"
    @close="handleClose"
  >
    <VForm
      :validation-schema="ElectronicSchema"
      @submit="onSubmit"
      v-slot="{ errors }"
    >
      <el-form label-position="top">
        <el-form-item label="ផលិតផល" :error="errors.product_id" required>
          <VField name="product_id" v-model="form.product_id">
            <el-select
              v-model="form.product_id"
              filterable
              remote
              reserve-keyword
              placeholder="វាយឈ្មោះដើម្បីស្វែងរក..."
              :remote-method="remoteMethod"
              :loading="isProductLoading"
              class="w-full"
            >
              <el-option
                v-if="props.data.product"
                :key="props.data.product_id"
                :label="props.data.product.name"
                :value="String(props.data.product_id)"
              />

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
            <el-input v-model="form.sku" />
          </VField>
        </el-form-item>

        <el-form-item label="កញ្ចប់ (Package)" :error="errors.package" required>
          <VField name="package" v-model="form.package">
            <el-input v-model="form.package" />
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

        <el-form-item label="ក្នុងស្តុក" :error="errors.in_stock">
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
          :loading="updateMutation.isPending.value"
        >
          រក្សាទុកការកែប្រែ
        </el-button>
      </div>
    </VForm>
  </el-dialog>
</template>
