<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Delete, Plus } from "@element-plus/icons-vue";
import { Form as VForm, Field as VField } from "vee-validate";
import { ProductSchema } from "~/utils/schemas";
import { ElMessage } from "element-plus";
import { useQuery } from "@tanstack/vue-query";
import type { BrandType, CategoryType, ProductType } from "~/types";

const { createMutation } = useProducts();
const { fetchBrands } = useBrands();
const { fetchData: fetchCategories } = useCategories();

const dialogVisible = ref(false);

const { data: brands, isLoading: loadingBrands } = useQuery<BrandType[]>({
  queryKey: ["brands"],
  queryFn: fetchBrands,
});

const { data: categories, isLoading: loadingCategories } = useQuery<
  CategoryType[]
>({
  queryKey: ["categories"],
  queryFn: fetchCategories,
});

const form = reactive<any>({
  name: "",
  description: "",
  stockQty: 0,
  price: 0,
  specifications: [{ key: "", value: "" }],
  discount: 0,
  isActive: true,
  isUsed: false,
  brandId: "",
  categoryIds: [],
  thumbnailUrl: "",
  electronics: {
    sku: "",
    package: "",
  },
});

const isUploading = ref(false);
const { $api } = useNuxtApp();

const uploadImage = async (options: any) => {
  try {
    isUploading.value = true;
    const formData = new FormData();
    formData.append("file", options.file);
    const res = await $api.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    form.thumbnailUrl = res.data.url;
    ElMessage.success("បញ្ជូលរូបភាពជោគជ័យ");
  } catch (error: any) {
    ElMessage.error("មានបញ្ហាក្នុងការបញ្ជូលរូបភាព");
  } finally {
    isUploading.value = false;
  }
};

const handleClose = () => {
  form.name = "";
  form.description = "";
  form.stockQty = 0;
  form.price = 0;
  form.specifications = [{ key: "", value: "" }];
  form.discount = 0;
  form.isActive = true;
  form.isUsed = false;
  form.brandId = "";
  form.categoryIds = [];
  form.thumbnailUrl = "";
  form.electronics = { sku: "", package: "" };
};

// មុខងារបន្ថែម Row ថ្មី
const addSpec = () => {
  form.specifications.push({ key: "", value: "" });
};

// មុខងារលុប Row
const removeSpec = (index: number) => {
  form.specifications.splice(index, 1);
};

const onSubmit = async (values: any) => {
  try {
    // ១. បម្លែងពី Array [{key: '...', value: '...'}] ទៅជា Object { key: value }
    const specsObject = form.specifications.reduce(
      (
        acc: { [key: string]: string },
        curr: { key: string; value: string },
      ) => {
        if (curr.key.trim()) {
          // យកតែ Row ណាដែលមានបំពេញ Key
          acc[curr.key] = curr.value;
        }
        return acc;
      },
      {} as any,
    );

    // ២. បង្កើត Payload ដោយបម្លែង specsObject ទៅជា JSON String
    const payload = {
      ...values,
      stockQty: Number(values.stockQty),
      price: Number(values.price),
      discount: values.discount ? Number(values.discount) : null,
      // កែត្រង់នេះ៖ បម្លែងជា String ដើម្បីឱ្យត្រូវតាមការចង់បានរបស់ Backend
      specifications: JSON.stringify(specsObject),
    };

    // បញ្ចូល electronics ប្រសិនបើមានលេខកូដ SKU
    if (form.electronics?.sku) {
      payload.electronics = {
        sku: form.electronics.sku,
        package: form.electronics.package || "N/A",
      };
    }

    await createMutation.mutateAsync(payload);
    dialogVisible.value = false;
    handleClose();
    ElMessage.success("បង្កើតផលិតផលបានជោគជ័យ");
  } catch (error: any) {
    // បង្ហាញ Error Message ដែលផ្ញើមកពី Backend
    const msg = error.response?.data?.message || error.message;
    ElMessage.error(Array.isArray(msg) ? msg[0] : msg);
  }
};
</script>

<template>
  <el-button type="primary" @click="dialogVisible = true">
    <el-icon class="mr-1"><Plus /></el-icon> បង្កើតផលិតផល
  </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="បង្កើតផលិតផល"
    width="600px"
    @close="handleClose"
  >
    <VForm
      :validation-schema="ProductSchema"
      @submit="onSubmit"
      v-slot="{ errors }"
    >
      <el-form label-position="top">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
              label="រូបភាពផលិតផល (Thumbnail)"
              :error="errors.thumbnailUrl"
              required
            >
              <VField name="thumbnailUrl" v-model="form.thumbnailUrl">
                <el-upload
                  class="border-dashed border-2 border-gray-300 rounded-lg flex justify-center items-center w-32 h-32 cursor-pointer hover:border-blue-500 overflow-hidden relative"
                  :show-file-list="false"
                  :http-request="uploadImage"
                  v-loading="isUploading"
                >
                  <img
                    v-if="form.thumbnailUrl"
                    :src="form.thumbnailUrl"
                    class="w-full h-full object-cover"
                  />
                  <el-icon v-else class="text-3xl text-gray-400"
                    ><Plus
                  /></el-icon>
                </el-upload>
              </VField>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="ឈ្មោះ" :error="errors.name" required>
              <VField name="name" v-model="form.name">
                <el-input v-model="form.name" placeholder="បញ្ចូលឈ្មោះ..." />
              </VField>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="ស្តុក" :error="errors.stockQty" required>
              <VField name="stockQty" v-model="form.stockQty">
                <el-input-number
                  v-model="form.stockQty"
                  :min="0"
                  style="width: 100%"
                />
              </VField>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="តម្លៃ ($)" :error="errors.price" required>
              <VField name="price" v-model="form.price">
                <el-input-number
                  v-model="form.price"
                  :min="0"
                  :precision="2"
                  style="width: 100%"
                />
              </VField>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="បញ្ចុះតម្លៃ (%)" :error="errors.discount">
              <VField name="discount" v-model="form.discount">
                <el-input-number
                  v-model="form.discount"
                  :min="0"
                  :max="100"
                  style="width: 100%"
                />
              </VField>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="ស្ថានភាព" required>
              <div class="flex gap-4">
                <VField name="isActive" v-model="form.isActive">
                  <el-checkbox v-model="form.isActive">Active</el-checkbox>
                </VField>
                <VField name="isUsed" v-model="form.isUsed">
                  <el-checkbox v-model="form.isUsed">មួយទឹក (Used)</el-checkbox>
                </VField>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="mb-4 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <h3 class="text-sm font-bold text-gray-600 mb-3">ព័ត៌មានអេឡិចត្រូនិច (Electronics Info)</h3>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="លេខកូដ (SKU)">
                <el-input v-model="form.electronics.sku" placeholder="Ex: IC-74HC595" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="ប្រភេទសំបក (Package)">
                <el-input v-model="form.electronics.package" placeholder="Ex: DIP-16, SMD" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div
          class="mb-4 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50"
        >
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-sm font-bold text-gray-600">
              បច្ចេកទេសលម្អិត (Specifications)
            </h3>
            <el-button type="primary" size="small" @click="addSpec" circle>
              <el-icon><Plus /></el-icon>
            </el-button>
          </div>

          <div
            v-for="(spec, index) in form.specifications"
            :key="index"
            class="flex gap-2 mb-2"
          >
            <el-input
              v-model="spec.key"
              placeholder="ឈ្មោះ (ឧ: Architecture)"
              style="flex: 1"
            />
            <el-input
              v-model="spec.value"
              placeholder="តម្លៃ (ឧ: 8-Bit AVR)"
              style="flex: 1"
            />
            <el-button
              type="danger"
              :icon="Delete"
              circle
              size="small"
              @click="removeSpec(Number(index))"
              v-if="form.specifications.length > 1"
            />
          </div>
          <p class="text-xs text-gray-400 mt-2 italic">
            * បំពេញព័ត៌មានបច្ចេកទេសដូចជា RAM, Memory, Voltage...
          </p>
        </div>
        <el-form-item label="ការពិពណ៌នា" :error="errors.description">
          <VField name="description" v-model="form.description">
            <el-input type="textarea" v-model="form.description" />
          </VField>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="ម៉ាកយីហោ" :error="errors.brandId" required>
              <VField name="brandId" v-model="form.brandId">
                <el-select
                  v-model="form.brandId"
                  placeholder="ជ្រើសរើសម៉ាក"
                  class="w-full"
                  filterable
                  :loading="loadingBrands"
                >
                  <el-option
                    v-for="b in brands"
                    :key="b.id"
                    :label="b.name"
                    :value="String(b.id)"
                  />
                </el-select>
              </VField>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="ប្រភេទផលិតផល"
              :error="errors.categoryIds"
              required
            >
              <VField
                name="categoryIds"
                v-slot="{ field }"
                v-model="form.categoryIds"
              >
                <el-select
                  v-bind="field"
                  v-model="form.categoryIds"
                  placeholder="ជ្រើសរើស ឬវាយបញ្ចូលថ្មី"
                  class="w-full"
                  filterable
                  multiple
                  allow-create
                  default-first-option
                  :loading="loadingCategories"
                >
                  <el-option
                    v-for="c in categories"
                    :key="c.id"
                    :label="c.name"
                    :value="String(c.id)"
                  />
                </el-select>
              </VField>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="flex justify-end mt-4">
        <el-button @click="dialogVisible = false">បោះបង់</el-button>
        <el-button
          type="primary"
          native-type="submit"
          :loading="createMutation.isPending.value"
        >
          រក្សាទុក
        </el-button>
      </div>
    </VForm>
  </el-dialog>
</template>
