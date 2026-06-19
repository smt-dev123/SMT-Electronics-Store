<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import { Edit } from "@element-plus/icons-vue";
import { Form as VForm, Field as VField } from "vee-validate";
import { BulkPriceSchema } from "~/utils/schemas";
import type { BulkPriceType } from "~/types";
import { ElMessage } from "element-plus";

const props = defineProps<{
  data: BulkPriceType;
}>();

const { updateMutation } = useBulkPrices();
const dialogVisible = ref(false);

const form = reactive({
  minQty: 1,
  price: 0,
  electronicId: "",
});

watch(
  () => props.data,
  (newData) => {
    if (newData) {
      form.minQty = newData.minQty;
      form.price = newData.price;
      form.electronicId = newData.electronicId;
    }
  },
  { immediate: true, deep: true }
);

const handleClose = () => {
  form.minQty = props.data.minQty;
  form.price = props.data.price;
  form.electronicId = props.data.electronicId;
};

const onSubmit = async (values: any) => {
  try {
    await updateMutation.mutateAsync({
      id: props.data.id!,
      data: {
        minQty: Number(values.minQty),
        price: Number(values.price),
        electronicId: values.electronicId
      },
    });
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
    title="កែប្រែតម្លៃលក់ដុំ"
    width="500px"
    @close="handleClose"
  >
    <VForm
      :validation-schema="BulkPriceSchema"
      @submit="onSubmit"
      v-slot="{ errors }"
    >
      <el-form label-position="top">
        <el-form-item label="ចំនួនអប្បបរមា" :error="errors.minQty" required>
          <VField name="minQty" v-model="form.minQty">
            <el-input-number v-model="form.minQty" :min="1" class="w-full" />
          </VField>
        </el-form-item>

        <el-form-item label="តម្លៃ" :error="errors.price" required>
          <VField name="price" v-model="form.price">
            <el-input-number v-model="form.price" :min="0" :precision="2" :step="0.1" class="w-full" />
          </VField>
        </el-form-item>

        <el-form-item label="Electronic ID" :error="errors.electronicId" required>
          <VField name="electronicId" v-model="form.electronicId">
            <el-input v-model="form.electronicId" placeholder="បញ្ចូល ID..." />
          </VField>
        </el-form-item>
      </el-form>

      <div class="flex justify-end mt-4">
        <el-button @click="dialogVisible = false">បោះបង់</el-button>
        <el-button
          type="primary"
          native-type="submit"
          :loading="updateMutation.isPending.value"
        >
          រក្សាទុក
        </el-button>
      </div>
    </VForm>
  </el-dialog>
</template>
