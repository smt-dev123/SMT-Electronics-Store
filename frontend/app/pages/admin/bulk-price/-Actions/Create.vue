<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { Form as VForm, Field as VField } from "vee-validate";
import { BulkPriceSchema } from "~/utils/schemas";
import { ElMessage } from "element-plus";

const { createMutation } = useBulkPrices();

const dialogVisible = ref(false);

const form = reactive({
  minQty: 1,
  price: 0,
  electronicId: "",
});

const handleClose = () => {
  form.minQty = 1;
  form.price = 0;
  form.electronicId = "";
};

const onSubmit = async (values: any) => {
  try {
    await createMutation.mutateAsync({
      minQty: Number(values.minQty),
      price: Number(values.price),
      electronicId: values.electronicId
    });
    dialogVisible.value = false;
    handleClose();
  } catch (error: any) {
    ElMessage.error(error.message || "មានបញ្ហា");
  }
};
</script>

<template>
  <el-button type="primary" @click="dialogVisible = true">
    <el-icon class="mr-1"><Plus /></el-icon> បង្កើតតម្លៃលក់ដុំ
  </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="បង្កើតតម្លៃលក់ដុំ"
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
          :loading="createMutation.isPending.value"
        >
          រក្សាទុក
        </el-button>
      </div>
    </VForm>
  </el-dialog>
</template>
