<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { Form as VForm, Field as VField } from "vee-validate";
import { DatasheetSchema } from "~/utils/schemas";
import { ElMessage } from "element-plus";

const { createMutation } = useDatasheets();

const dialogVisible = ref(false);

const form = reactive({
  name: "",
  size: "",
  fileUrl: "",
  productId: "",
});

const handleClose = () => {
  form.name = "";
  form.size = "";
  form.fileUrl = "";
  form.productId = "";
};

const onSubmit = async (values: any) => {
  try {
    const payload = { ...values };
    if (!payload.productId) delete payload.productId; // handle nullable
    await createMutation.mutateAsync(payload);
    dialogVisible.value = false;
    handleClose();
  } catch (error: any) {
    ElMessage.error(error.message || "មានបញ្ហា");
  }
};
</script>

<template>
  <el-button type="primary" @click="dialogVisible = true">
    <el-icon class="mr-1"><Plus /></el-icon> បង្កើតឯកសារបច្ចេកទេស
  </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="បង្កើតឯកសារបច្ចេកទេស"
    width="500px"
    @close="handleClose"
  >
    <VForm
      :validation-schema="DatasheetSchema"
      @submit="onSubmit"
      v-slot="{ errors }"
    >
      <el-form label-position="top">
        <el-form-item label="ឈ្មោះឯកសារ" :error="errors.name" required>
          <VField name="name" v-model="form.name">
            <el-input v-model="form.name" placeholder="បញ្ចូលឈ្មោះ..." />
          </VField>
        </el-form-item>

        <el-form-item label="ទំហំ" :error="errors.size" required>
          <VField name="size" v-model="form.size">
            <el-input v-model="form.size" placeholder="ឧ. 1.2MB" />
          </VField>
        </el-form-item>

        <el-form-item label="URL ឯកសារ" :error="errors.fileUrl" required>
          <VField name="fileUrl" v-model="form.fileUrl">
            <el-input v-model="form.fileUrl" placeholder="បញ្ចូល URL..." />
          </VField>
        </el-form-item>
        
        <el-form-item label="Product ID" :error="errors.productId">
          <VField name="productId" v-model="form.productId">
            <el-input v-model="form.productId" placeholder="បញ្ចូល Product ID..." />
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
