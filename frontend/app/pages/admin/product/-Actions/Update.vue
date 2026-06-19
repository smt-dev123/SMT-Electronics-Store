<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import { Delete, Edit } from "@element-plus/icons-vue";
import { Form as VForm, Field as VField } from "vee-validate";
import { ProductSchema } from "~/utils/schemas";
import type { ProductType, BrandType, CategoryType } from "~/types";
import { ElMessage } from "element-plus";
import { useQuery } from "@tanstack/vue-query";
import { Plus } from '@element-plus/icons-vue'

const props = defineProps<{
  data: ProductType;
}>();

const { updateMutation } = useProducts();
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

const form = reactive({
  name: "",
  slug: "",
  description: "",
  stock_quantity: 0,
  price: 0,
  spec_list: [{ key: "", value: "" }],
  specifications: {},
  discount: 0,
  is_active: true,
  is_used: false,
  brand_id: "",
  category_ids: [] as string[],
  thumbnailUrl: "",
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

const addSpec = () => {
  form.spec_list.push({ key: "", value: "" });
};

// មុខងារលុប Row
const removeSpec = (index: number) => {
  form.spec_list.splice(index, 1);
};

const onSubmit = async (values: any) => {
  try {
    // ១. បម្លែងពី Array [{key: '...', value: '...'}] ទៅជា Object { key: value }
    const specsObject = form.spec_list.reduce((acc, curr) => {
      if (curr.key.trim()) {
        acc[curr.key] = curr.value;
      }
      return acc;
    }, {} as any);

    // ២. រៀបចំ Payload ផ្ញើទៅ Backend (បម្លែង specifications ជា JSON String)
    const payload = {
      ...values,
      stock_quantity: Number(values.stock_quantity),
      price: Number(values.price),
      discount: values.discount ? Number(values.discount) : null,
      specifications: JSON.stringify(specsObject), // បម្លែងជា String ដើម្បីកុំឱ្យបុក Error 400
    };

    await updateMutation.mutateAsync({
      slug: props.data.slug!,
      data: payload,
    });

    dialogVisible.value = false;
    ElMessage.success("កែប្រែបានជោគជ័យ");
  } catch (error: any) {
    const msg = error.response?.data?.message || error.message;
    ElMessage.error(Array.isArray(msg) ? msg[0] : msg);
  }
};

// មុខងារជំនួយសម្រាប់បម្លែង Specifications ពី DB មកជា Form List
// កែសម្រួល function នេះនៅក្នុង Update.vue របស់អ្នក
const mapSpecsToList = (specs: any) => {
  // ១. បើគ្មានទិន្នន័យ (null/undefined)
  if (!specs) return [];

  // ២. បើវាជា Array រួចស្រេចហើយ (ក្នុងករណី API បោះមកជា object ស្រាប់)
  if (Array.isArray(specs)) return specs;

  // ៣. បើវាជា String
  if (typeof specs === 'string') {
    // ឆែកមើលថា តើវាមានទម្រង់ជា JSON មែនឬទេ (ចាប់ផ្ដើមដោយ { ឬ [ )
    if (specs.startsWith('{') || specs.startsWith('[')) {
      try {
        const parsed = JSON.parse(specs);
        return Array.isArray(parsed) ? parsed : []; 
      } catch (e) {
        console.warn("Invalid JSON format in specifications, returning empty array.");
        return [];
      }
    }
    
    // បើវាគ្រាន់តែជាអក្សរធម្មតា (ដូចជាពាក្យថា "string" ក្នុងករណីរបស់អ្នក)
    // ត្រឡប់វាជា format ដែល Form របស់អ្នកអាចអានបាន (ឧទាហរណ៍៖ key-value pair)
    return [{ key: 'ព័ត៌មានលម្អិត', value: specs }];
  }

  return [];
};

watch(
  () => props.data,
  (newData) => {
    if (newData) {
      form.name = newData.name;
      form.slug = newData.slug;
      form.description = newData.description || "";
      form.stock_quantity = newData.stock_quantity;
      form.price = newData.price;
      form.discount = newData.discount || 0;
      form.is_active = newData.is_active;
      form.is_used = newData.is_used;
      form.brand_id = String(newData.brand_id);
      form.category_ids = Array.isArray(newData.categories)
        ? newData.categories.map((c: any) => String(c.id))
        : [];
      form.thumbnailUrl = newData.thumbnailUrl || "";

      try {
        form.specifications = mapSpecsToList(newData.specifications);
      } catch (err) {
        form.specifications = []; // ការពារកុំឱ្យ setup គាំង
        console.error("Critical error in specifications mapping:", err);
      }
    }
  },
  { immediate: true, deep: true },
);

const handleClose = () => {
  if (props.data) {
    form.name = props.data.name;
    form.slug = props.data.slug;
    form.description = props.data.description || "";
    form.stock_quantity = props.data.stock_quantity;
    form.price = props.data.price;
    form.discount = props.data.discount || 0;
    form.is_active = props.data.is_active;
    form.is_used = props.data.is_used;
    form.brand_id = String(props.data.brand_id);
    form.category_ids = Array.isArray(props.data.categories)
      ? props.data.categories.map((c: any) => String(c.id))
      : [];
    form.thumbnailUrl = props.data.thumbnailUrl || "";

    form.spec_list = mapSpecsToList(props.data.specifications);
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
    title="កែប្រែផលិតផល"
    width="600px"
    append-to-body
    @close="handleClose"
  >
    <VForm
      :validation-schema="ProductSchema"
      @submit="onSubmit"
      v-slot="{ errors }"
    >
      <el-form label-position="top">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="ឈ្មោះ" :error="errors.name" required>
              <VField name="name" v-model="form.name">
                <el-input v-model="form.name" placeholder="បញ្ចូលឈ្មោះ..." />
              </VField>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Slug" :error="errors.slug" required>
              <VField name="slug" v-model="form.slug">
                <el-input v-model="form.slug" placeholder="បញ្ចូល Slug..." />
              </VField>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="រូបភាពផលិតផល (Thumbnail)" :error="errors.thumbnailUrl" required>
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
                  <el-icon v-else class="text-3xl text-gray-400"><Plus /></el-icon>
                </el-upload>
              </VField>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="ស្តុក" :error="errors.stock_quantity" required>
              <VField name="stock_quantity" v-model="form.stock_quantity">
                <el-input-number
                  v-model="form.stock_quantity"
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
                <VField name="is_active" v-model="form.is_active">
                  <el-checkbox v-model="form.is_active">Active</el-checkbox>
                </VField>
                <VField name="is_used" v-model="form.is_used">
                  <el-checkbox v-model="form.is_used">មួយទឹក (Used)</el-checkbox>
                </VField>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
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
            v-for="(spec, index) in form.spec_list"
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
              @click="removeSpec(index)"
              v-if="form.spec_list.length > 1"
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
            <el-form-item label="ម៉ាកយីហោ" :error="errors.brand_id" required>
              <VField name="brand_id" v-model="form.brand_id">
                <el-select
                  v-model="form.brand_id"
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
              :error="errors.category_ids"
              required
            >
              <VField name="category_ids" v-model="form.category_ids">
                <el-select
                  v-model="form.category_ids"
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

      <div class="flex justify-end mt-4 gap-2">
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
